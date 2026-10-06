import { test, expect } from "@playwright/test";

test.describe("User login", () => {
  test("shows validation errors when submitted empty", async ({ page }) => {
    await page.goto("/login");

    await expect(page.getByRole("heading", { name: "Welcome Back" })).toBeVisible();
    await page.getByRole("button", { name: "Sign In", exact: true }).click();

    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
  });

  test("clears a field error once the user types", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: "Sign In", exact: true }).click();
    await expect(page.getByText("Email is required")).toBeVisible();

    await page.getByPlaceholder("your@email.com").fill("traveller@example.com");

    await expect(page.getByText("Email is required")).toBeHidden();
    await expect(page.getByText("Password is required")).toBeVisible();
  });
});

test.describe("Admin login", () => {
  test("shows validation errors when submitted empty", async ({ page }) => {
    await page.goto("/admin/login");

    await expect(page.getByRole("heading", { name: "Admin Portal" })).toBeVisible();
    await page.getByRole("button", { name: "Sign In", exact: true }).click();

    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
  });
});

test.describe("Protected routes", () => {
  test("redirects a signed-out visitor from the admin dashboard to admin login", async ({ page }) => {
    await page.goto("/admin/dashboard");

    await expect(page).toHaveURL(/\/admin\/login$/);
    await expect(page.getByRole("heading", { name: "Admin Portal" })).toBeVisible();
  });

  test("redirects a signed-out visitor from the agent dashboard to agent login", async ({ page }) => {
    await page.goto("/agent/dashboard");

    await expect(page).toHaveURL(/\/agent\/login$/);
    await expect(page.getByRole("heading", { name: "Agent Login" })).toBeVisible();
  });
});
