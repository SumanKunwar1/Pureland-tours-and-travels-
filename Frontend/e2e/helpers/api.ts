import type { Page, Request, Route } from "@playwright/test";

type Handler = (route: Route, request: Request) => Promise<void> | void;

// The app calls the API on another origin with credentials, so mocked
// responses need matching CORS headers or the browser discards them.
export async function fulfillJson(route: Route, body: unknown, status = 200) {
  const origin = route.request().headers()["origin"] ?? "*";
  await route.fulfill({
    status,
    contentType: "application/json",
    headers: {
      "access-control-allow-origin": origin,
      "access-control-allow-credentials": "true",
    },
    body: JSON.stringify(body),
  });
}

/**
 * Mock the backend so the e2e suite never touches a real database.
 * Keys are "METHOD /path" relative to /api/v1 (e.g. "GET /hero-images/active").
 * Anything not listed fails like an offline API, which the pages already handle.
 */
export async function mockApi(page: Page, handlers: Record<string, Handler>) {
  await page.route("**/api/v1/**", async (route, request) => {
    const path = new URL(request.url()).pathname.replace(/^.*\/api\/v1/, "");
    const handler = handlers[`${request.method()} ${path}`];
    if (handler) {
      await handler(route, request);
    } else {
      await route.abort();
    }
  });
}

/** Sign in as an admin without a backend: seed the token and accept it on /auth/me. */
export async function mockAdminSession(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem("adminToken", "e2e-test-token");
    localStorage.setItem("adminUser", JSON.stringify({ name: "E2E Admin", email: "admin@example.com" }));
  });

  return {
    "GET /auth/me": (route: Route) =>
      fulfillJson(route, {
        status: "success",
        data: { admin: { _id: "admin-1", name: "E2E Admin", email: "admin@example.com" } },
      }),
  };
}

// A stand-in "photo" of the given size: sky, sun and mountain ridges.
export function scenicSvg(width: number, height: number, sky: [string, string] = ["#f6c98a", "#7fa6c9"]) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="sky" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#sky)"/>
  <circle cx="${width * 0.72}" cy="${height * 0.3}" r="${Math.min(width, height) * 0.09}" fill="#fff4d6"/>
  <path d="M0 ${height * 0.62} L${width * 0.22} ${height * 0.38} L${width * 0.42} ${height * 0.6} L${width * 0.63} ${height * 0.34} L${width} ${height * 0.66} V${height} H0 Z" fill="#5d7f8f"/>
  <path d="M0 ${height * 0.8} L${width * 0.3} ${height * 0.58} L${width * 0.55} ${height * 0.78} L${width * 0.8} ${height * 0.6} L${width} ${height * 0.74} V${height} H0 Z" fill="#2f5d50"/>
</svg>`;
}

/** Serve generated banners for https://img.test/<name>-<width>x<height>.svg */
export async function mockBannerImages(page: Page) {
  await page.route("https://img.test/**", async (route, request) => {
    const match = request.url().match(/-(\d+)x(\d+)\.svg/);
    const [width, height] = match ? [Number(match[1]), Number(match[2])] : [1600, 900];
    await route.fulfill({
      status: 200,
      contentType: "image/svg+xml",
      headers: { "access-control-allow-origin": "*" },
      body: scenicSvg(width, height),
    });
  });
}
