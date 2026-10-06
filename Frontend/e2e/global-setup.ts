import { chromium, type FullConfig } from "@playwright/test";

// The Vite dev server compiles the whole app on the first request, which can take
// over a minute on a cold cache. Load it once here so individual tests stay fast.
export default async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0].use.baseURL;
  if (!baseURL) return;

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(baseURL, { waitUntil: "domcontentloaded", timeout: 180_000 });
  await browser.close();
}
