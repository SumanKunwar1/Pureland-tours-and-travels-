import { test, expect } from "@playwright/test";
import { fulfillJson, mockAdminSession, mockApi } from "./helpers/api";

const BOOKINGS = [
  {
    _id: "b1",
    customerName: "Tenzin Dolma",
    email: "tenzin@example.com",
    phone: "+977 98010 12345",
    tripName: "Kailash Mansarovar Yatra",
    travelers: 2,
    totalAmount: 400000,
    status: "Pending",
    createdAt: "2026-10-01T08:00:00.000Z",
  },
];

test.use({ viewport: { width: 1440, height: 900 } });

test("admin bookings show the customer's phone number as a tap-to-call link", async ({ page }) => {
  const session = await mockAdminSession(page);
  await mockApi(page, {
    ...session,
    "GET /bookings": (route) =>
      fulfillJson(route, { status: "success", data: { bookings: BOOKINGS, pagination: { total: 1, page: 1, pages: 1 } } }),
  });

  await page.goto("/admin/bookings");

  await expect(page.getByRole("columnheader", { name: "Phone" })).toBeVisible();
  const row = page.getByRole("row", { name: /Tenzin Dolma/ });
  const phone = row.getByRole("link", { name: "+977 98010 12345" });
  await expect(phone).toBeVisible();
  await expect(phone).toHaveAttribute("href", "tel:+9779801012345");
});
