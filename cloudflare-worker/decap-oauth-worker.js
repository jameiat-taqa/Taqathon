/**
 * DECAP CMS — GITHUB OAUTH PROXY (Cloudflare Worker)
 * ----------------------------------------------------
 * WHY THIS FILE EXISTS AT ALL:
 * Decap CMS's "github" backend needs to turn a GitHub login into an
 * access token, and that exchange requires a client SECRET — a value
 * that can never be safely shipped to a visitor's browser (anyone
 * could read it out of the page source and impersonate the app). So
 * the actual token exchange has to happen on some small server Decap
 * trusts, not in the browser. This file IS that small server — except
 * it doesn't run on a server we manage, it runs on Cloudflare's free
 * "Workers" platform, which executes this script on Cloudflare's own
 * edge network on every request, no server to patch or pay for.
 *
 * (An earlier attempt tried to get Netlify to do this instead, for
 * free, without deploying anything real to Netlify — that turned out
 * to only work for sites Netlify is ACTUALLY building and deploying,
 * not a blank placeholder site, so it 404'd. This Worker replaces
 * that approach entirely; nothing here depends on Netlify at all.)
 *
 * THE HANDSHAKE, START TO FINISH:
 * 1. Someone clicks "Login with GitHub" on /admin/. Decap CMS opens a
 *    small popup window pointed at this Worker's "/auth" path (that
 *    URL is admin/config.yml's backend.base_url + backend.auth_endpoint).
 * 2. This Worker's "/auth" handler immediately redirects that popup to
 *    GitHub's own login/authorize page, telling GitHub "when you're
 *    done, send the user back to this Worker's /callback path."
 * 3. The person logs into GitHub (if they aren't already) and approves
 *    the "Taqathon CMS" OAuth app. GitHub redirects the popup back to
 *    this Worker's "/callback" path, with a short-lived, single-use
 *    "code" in the URL.
 * 4. This Worker's "/callback" handler exchanges that code for a real
 *    access token by calling GitHub's API directly — server-to-server,
 *    so the client secret used here never touches the browser at all.
 * 5. "/callback" then returns a tiny HTML page (not a redirect this
 *    time) whose only job is to hand that token back to the ORIGINAL
 *    /admin/ page via `window.postMessage` — the standard way two
 *    browser windows (a popup and the page that opened it) can pass
 *    data to each other. The exact two-message exchange below
 *    ("authorizing:github" then "authorization:github:success:...")
 *    is Decap's own documented protocol for this — both message
 *    strings have to match exactly, or Decap's side never recognizes
 *    the reply and the popup just closes with nothing happening.
 * 6. Decap CMS (in the original, non-popup window) receives that
 *    message, stores the token, closes the popup, and the person is
 *    logged in — able to read/write this repo's files through GitHub's
 *    API for as long as that token is valid.
 *
 * WHAT YOU NEED TO SET UP TO USE THIS (see README.md's "Content
 * Management (Decap CMS)" section for the full walkthrough):
 *   1. A GitHub OAuth App (github.com → Settings → Developer settings
 *      → OAuth Apps) whose "Authorization callback URL" is this
 *      Worker's own URL + "/callback", e.g.
 *      https://<your-worker-name>.<your-subdomain>.workers.dev/callback
 *   2. Deploy this exact file as a Cloudflare Worker (Cloudflare
 *      dashboard → Workers & Pages → Create → paste this code in).
 *   3. In that Worker's Settings → Variables, add two SECRET
 *      environment variables (not "plaintext" — secrets are encrypted
 *      and never shown again after saving): GITHUB_CLIENT_ID and
 *      GITHUB_CLIENT_SECRET, from the OAuth App in step 1.
 *   4. Put the Worker's own URL into admin/config.yml's
 *      backend.base_url (see the comment there).
 *
 * A note on scope: this Worker only does the generic "exchange a code
 * for a token" step — it has no idea what repo anyone is trying to
 * edit, and doesn't need to. Whether a given logged-in GitHub account
 * can actually read/write jameiat-taqa/Taqathon is enforced entirely
 * by GitHub itself (via the repo's collaborator list), the same as any
 * other GitHub API access — this Worker never touches that decision.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      return handleAuth(url, env);
    }
    if (url.pathname === "/callback") {
      return handleCallback(url, env);
    }
    return new Response("Not found", { status: 404 });
  },
};

/**
 * Step 2 above: send the popup on to GitHub's own login/authorize
 * screen. redirect_uri is built from THIS request's own origin, so
 * the same code works whether the Worker ends up at its default
 * *.workers.dev address or a custom domain later — no hardcoding.
 */
function handleAuth(url, env) {
  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  authorizeUrl.searchParams.set("redirect_uri", url.origin + "/callback");
  authorizeUrl.searchParams.set("scope", "repo,user");
  // A random, single-use value GitHub echoes back on /callback. This
  // Worker doesn't re-check it (kept simple, matching the common
  // community pattern this file is based on) — it's a defense-in-depth
  // CSRF guard on the login round-trip itself, not something a final
  // repo-write decision depends on; that's still entirely GitHub's own
  // collaborator-permission check on every actual API call Decap makes.
  authorizeUrl.searchParams.set(
    "state",
    crypto.getRandomValues(new Uint8Array(12)).join("")
  );
  return Response.redirect(authorizeUrl.href, 302);
}

/**
 * Step 4-5 above: turn GitHub's one-time "code" into a real access
 * token (server-to-server, so GITHUB_CLIENT_SECRET never reaches the
 * browser), then hand that token to the /admin/ page via postMessage.
 */
async function handleCallback(url, env) {
  const code = url.searchParams.get("code");

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      "user-agent": "taqathon-decap-oauth-worker",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });
  const result = await tokenResponse.json();

  const status = result.error ? "error" : "success";
  const content = result.error ? result : { token: result.access_token, provider: "github" };

  return new Response(renderHandoffPage(status, content), {
    headers: { "content-type": "text/html;charset=UTF-8" },
    status: result.error ? 401 : 200,
  });
}

/**
 * The postMessage handshake itself (step 5 above). Both message
 * strings ("authorizing:github" and "authorization:github:<status>:<json>")
 * are Decap CMS's own fixed protocol, not something this Worker
 * invented — Decap's code on the /admin/ side is listening for exactly
 * these strings, so they can't be reworded or restructured.
 *
 * The handshake is two round-trips, not one, specifically so this
 * popup can learn the /admin/ page's real origin (via `message.origin`
 * on the reply) before sending the token — postMessage requires
 * naming a target origin, and this popup doesn't otherwise know it.
 */
function renderHandoffPage(status, content) {
  return `<!DOCTYPE html>
<html>
<body>
<script>
(function () {
  function receiveMessage(message) {
    window.opener.postMessage(
      'authorization:github:${status}:${JSON.stringify(content)}',
      message.origin
    );
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
</body>
</html>`;
}
