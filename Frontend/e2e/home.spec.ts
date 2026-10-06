import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads with the site title and navbar", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Pure Land Tours & Travels/);
    await expect(page.locator("header nav")).toBeVisible();
    await expect(page.locator('header a[href="/"]').first()).toBeVisible();
  });

  test("shows the 404 page for an unknown route", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");

    await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
    await expect(page.getByText("Oops! Page not found")).toBeVisible();

    await page.getByRole("link", { name: "Return to Home" }).click();
    await expect(page).toHaveURL("/");
  });
});
