// Cloudflare Worker that wraps the static-assets build.
//
// Adds a single dynamic route: /f/{ident} renders a smart-redirect
// HTML page that tries to open the Sky Goat app via the skygoat://
// custom scheme, and falls back to the App Store after ~1.6s if the
// app didn't intercept. Everything else falls through to the static
// site (index.html, /privacy, /contact, /assets/*, etc.).
//
// Wired up by `main = "./src/worker.js"` in wrangler.toml. The
// static-assets binding is exposed as env.ASSETS.

const APP_STORE_URL = 'https://apps.apple.com/app/id6772517449';
const SKY_GOAT_BLUE = '#0EA5E9';
const DARK_NAVY = '#0a223e';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // /f/{ident} → smart redirect page.
    const m = url.pathname.match(/^\/f\/([^/]+)\/?$/);
    if (m) {
      const ident = sanitizeIdent(decodeURIComponent(m[1]));
      if (!ident) {
        // Empty or junk ident → just bounce to the homepage rather
        // than rendering a "broken link" experience.
        return Response.redirect(`${url.origin}/`, 302);
      }
      return new Response(renderRedirectPage(ident), {
        headers: {
          'content-type': 'text/html; charset=utf-8',
          // Don't let CDNs cache forever — if we change the smart-
          // redirect logic we want existing links to pick it up.
          'cache-control': 'public, max-age=300',
        },
      });
    }
    // Anything else → static assets.
    return env.ASSETS.fetch(request);
  },
};

// Sanitize a flight ident from the URL. Real IATA/ICAO idents are
// 2-10 chars of A-Z + 0-9. Anything outside that range gets stripped.
function sanitizeIdent(raw) {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
}

// Build the smart-redirect HTML for /f/{ident}.
// Strategy:
//   1. On load, set window.location.href = 'skygoat://flight/{ident}'.
//      iOS Safari will prompt "Open in Sky Goat?" if the app is
//      installed (the app's URL scheme handler then routes to the
//      PreFlight screen with that ident).
//   2. Start a 1.6s timer. If the user is still on this page when
//      the timer fires, the app didn't open — redirect to the App
//      Store.
function renderRedirectPage(ident) {
  // ident is already sanitized; safe to interpolate, but still JSON-
  // escape inside <script> as defense-in-depth.
  const jsIdent = JSON.stringify(ident);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <title>Sky Goat · Flight ${escapeHtml(ident)}</title>
  <meta name="theme-color" content="${DARK_NAVY}">
  <meta property="og:title" content="Track flight ${escapeHtml(ident)} on Sky Goat">
  <meta property="og:description" content="Live in-flight companion — open the flight in Sky Goat.">
  <meta property="og:image" content="https://sky-goat.com/assets/logo-with-text.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png">
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
  <style>
    :root { color-scheme: dark; }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif;
      background: ${DARK_NAVY};
      color: #fff;
      min-height: 100vh;
      min-height: 100dvh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 32px 24px;
      text-align: center;
    }
    img.logo { width: 96px; height: 96px; margin-bottom: 12px; }
    .eyebrow {
      font-size: 11px;
      letter-spacing: 2px;
      color: rgba(255,255,255,0.55);
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    h1 { font-size: 32px; font-weight: 800; margin: 0 0 6px; letter-spacing: -0.5px; }
    p.subtitle { color: rgba(255,255,255,0.7); margin: 0 0 28px; font-size: 15px; }
    a.cta {
      background: ${SKY_GOAT_BLUE};
      color: #fff;
      padding: 14px 36px;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 700;
      font-size: 16px;
      display: inline-block;
      transition: opacity 0.15s;
    }
    a.cta:active { opacity: 0.7; }
    p.foot {
      margin-top: 24px;
      color: rgba(255,255,255,0.4);
      font-size: 12px;
    }
  </style>
</head>
<body>
  <img class="logo" src="/assets/goat-logo.png" alt="Sky Goat">
  <div class="eyebrow">Flight</div>
  <h1>${escapeHtml(ident)}</h1>
  <p class="subtitle">Opening Sky Goat…</p>
  <a class="cta" id="store" href="${APP_STORE_URL}">Get Sky Goat</a>
  <p class="foot">If the app doesn't open automatically, tap the button above.</p>
<script>
(function () {
  var ident = ${jsIdent};
  var appStoreUrl = ${JSON.stringify(APP_STORE_URL)};
  var deepLink = 'skygoat://flight/' + ident;
  var openedAt = Date.now();

  // Fire the custom-scheme open. If the Sky Goat app is installed,
  // iOS hands the URL to it and the page goes to background. If not,
  // Safari shows a brief error and stays on this page — we redirect
  // to the App Store after 1.6s.
  try { window.location.href = deepLink; } catch (e) {}

  setTimeout(function () {
    // visibility check: if the page was backgrounded the app handled
    // the link successfully; do NOT bounce to App Store.
    if (document.visibilityState === 'hidden' || document.hidden) return;
    // Also a wall-clock sanity check — if the timer fired suspiciously
    // late (>2.5s), the page was likely backgrounded then resumed.
    if (Date.now() - openedAt > 2400) return;
    window.location.href = appStoreUrl;
  }, 1600);
})();
</script>
</body>
</html>`;
}

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
