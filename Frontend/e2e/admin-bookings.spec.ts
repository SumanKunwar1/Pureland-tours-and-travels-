import { test, expect, type Page } from "@playwright/test";
import { fulfillJson, mockAdminSession, mockApi } from "./helpers/api";

const BOOKINGS = [
  {
    _id: "b1",
    bookingId: "BK000012",
    customerName: "Tenzin Dolma",
    email: "tenzin@example.com",
    phone: "+977 98010 12345",
    message: "We are two adults, vegetarian meals please.",
    tripName: "Kailash Mansarovar Yatra by Helicopter",
    tripId: { _id: "trip-1" },
    travelers: 2,
    selectedDate: "12 Nov 2026",
    selectedPrice: 200000,
    totalAmount: 400000,
    status: "Pending",
    createdAt: "2026-10-01T08:00:00.000Z",
  },
  {
    _id: "b2",
    bookingId: "BK000011",
    customerName: "Karma Sherpa",
    email: "karma@example.com",
    phone: "9801000002",
    tripName: "Vipassana Weekend Retreat",
    tripId: null,
    travelers: 1,
    totalAmount: 15000,
    status: "Confirmed",
    createdAt: "2026-09-28T08:00:00.000Z",
  },
];

const STATS = { totalBookings: 34, confirmedBookings: 20, pendingBookings: 11, cancelledBookings: 3, totalRevenue: 4150000 };

async function openBookings(page: Page) {
  const updates: { id: string; status: string }[] = [];
  const session = await mockAdminSession(page);
  await mockApi(page, {
    ...session,
    "GET /bookings": (route) =>
      fulfillJson(route, { status: "success", data: { bookings: BOOKINGS, pagination: { total: 2, page: 1, pages: 1 } } }),
    "GET /bookings/admin/stats": (route) => fulfillJson(route, { status: "success", data: STATS }),
    "PATCH /bookings/b1": async (route, request) => {
      updates.push({ id: "b1", status: request.postDataJSON().status });
      await fulfillJson(route, { status: "success", data: { booking: {} } });
    },
  });

  await page.goto("/admin/bookings");
  await expect(page.getByRole("heading", { name: "Bookings", exact: true })).toBeVisible();
  return updates;
}

test.describe("Admin bookings on desktop", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("shows each booking with phone, trip details, amount and status", async ({ page }, testInfo) => {
    await openBookings(page);

    await expect(page.getByRole("columnheader", { name: "Phone" })).toBeVisible();
    const row = page.getByRole("row", { name: /Tenzin Dolma/ });
    const phone = row.getByRole("link", { name: "+977 98010 12345" });
    await expect(phone).toHaveAttribute("href", "tel:+9779801012345");
    await expect(row).toContainText("tenzin@example.com");
    await expect(row).toContainText("2 travellers");
    await expect(row).toContainText("12 Nov 2026");
    await expect(row).toContainText("BK000012");
    await expect(row).toContainText("Pending");
    // Amounts are Nepali Rupees, labelled as such rather than with the Indian ₹ sign.
    await expect(row).toContainText(/Rs/);
    await expect(row).not.toContainText("₹");

    // Summary cards and per-status counts on the filter tabs.
    await expect(page.getByText("Total Revenue")).toBeVisible();
    await expect(page.getByRole("tab", { name: /Pending/ })).toContainText("11");
    await expect(page.getByRole("tab", { name: /Confirmed/ })).toContainText("20");

    // The whole page, including the last column's buttons, fits the screen.
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await expect(row.getByRole("button", { name: "Delete Tenzin Dolma's booking" })).toBeInViewport({ ratio: 1 });
    expect(await page.getByRole("table").evaluate((table) => table.parentElement!.scrollWidth <= table.parentElement!.clientWidth)).toBe(true);

    await page.screenshot({ path: testInfo.outputPath("admin-bookings.png") });
  });

  test("opens the full booking, including the customer's message and contact links", async ({ page }, testInfo) => {
    const updates = await openBookings(page);

    await page.getByRole("button", { name: "View details of Tenzin Dolma's booking" }).click();
    const dialog = page.getByRole("dialog");

    await expect(dialog.getByRole("heading", { name: /Booking BK000012/ })).toBeVisible();
    await expect(dialog.getByText("We are two adults, vegetarian meals please.")).toBeVisible();
    await expect(dialog.getByRole("link", { name: "+977 98010 12345" })).toHaveAttribute("href", "tel:+9779801012345");
    await expect(dialog.getByRole("link", { name: "WhatsApp" })).toHaveAttribute("href", "https://wa.me/9779801012345");
    await expect(dialog.getByRole("link", { name: "tenzin@example.com" })).toHaveAttribute("href", "mailto:tenzin@example.com");
    await expect(dialog.getByRole("link", { name: "Open trip page" })).toHaveAttribute("href", "/trip/trip-1");
    await expect(dialog.getByText("Price per person")).toBeVisible();
    await page.screenshot({ path: testInfo.outputPath("admin-booking-details.png") });

    // The status can be changed from the details view too.
    await dialog.getByRole("button", { name: "Confirm" }).click();
    await expect(page.getByText("Booking confirmed").first()).toBeVisible();
    expect(updates).toEqual([{ id: "b1", status: "Confirmed" }]);
  });

  test("a booking without a message or a live trip still opens cleanly", async ({ page }) => {
    await openBookings(page);

    await page.getByRole("button", { name: "View details of Karma Sherpa's booking" }).click();
    const dialog = page.getByRole("dialog");

    await expect(dialog.getByText("No message was left.")).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Open trip page" })).toHaveCount(0);
    await expect(dialog.getByText("Not chosen")).toBeVisible();
  });
});

test.describe("Admin bookings on mobile", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test("lists bookings as cards that fit the screen", async ({ page }, testInfo) => {
    await openBookings(page);

    await expect(page.getByRole("table")).toBeHidden();
    const card = page.getByRole("listitem").filter({ hasText: "Tenzin Dolma" });
    await expect(card.getByRole("link", { name: "+977 98010 12345" })).toBeVisible();
    await expect(card).toContainText("Kailash Mansarovar Yatra by Helicopter");
    await expect(card.getByRole("button", { name: "Confirm booking" })).toBeVisible();

    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath("admin-bookings-mobile.png") });
  });
});
