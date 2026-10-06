import { test, expect, type Page, type Request } from "@playwright/test";
import { fulfillJson, mockAdminSession, mockApi } from "./helpers/api";

const PAGE_SIZE = 10;

const TRIPS = Array.from({ length: 23 }, (_, index) => ({
  _id: `trip-${index + 1}`,
  name: `Trip ${String(index + 1).padStart(2, "0")}`,
  destination: index % 2 === 0 ? "Nepal" : "Bhutan",
  tripCategory: [index < 4 ? "retreats" : "nepal-trips"],
  duration: "5 Days",
  price: 100000 + index,
  status: "Active",
  bookings: index,
}));

const BOOKINGS = Array.from({ length: 34 }, (_, index) => ({
  _id: `booking-${index + 1}`,
  customerName: `Customer ${String(index + 1).padStart(2, "0")}`,
  email: `customer${index + 1}@example.com`,
  phone: `98000000${String(index + 1).padStart(2, "0")}`,
  tripName: "Kailash Yatra",
  travelers: 1,
  totalAmount: 200000,
  status: "Pending",
  createdAt: "2026-10-01T08:00:00.000Z",
}));

// A stand-in for the server: it applies the same paging, search and category
// filter the real endpoints do, and records what the page asked for.
async function openAdminPage(page: Page, path: string) {
  const requests: Record<string, string>[] = [];
  const paramsOf = (request: Request) => Object.fromEntries(new URL(request.url()).searchParams);
  const slice = <T,>(rows: T[], params: Record<string, string>) => {
    const pageNumber = Number(params.page || 1);
    const limit = Number(params.limit || 100);
    return rows.slice((pageNumber - 1) * limit, pageNumber * limit);
  };

  const session = await mockAdminSession(page);
  await mockApi(page, {
    ...session,
    "GET /trips": (route, request) => {
      const params = paramsOf(request);
      requests.push(params);
      const matching = TRIPS.filter(
        (trip) =>
          (!params.q || trip.name.toLowerCase().includes(params.q.toLowerCase())) &&
          (!params.tripCategory || trip.tripCategory.includes(params.tripCategory))
      );
      const limit = Number(params.limit || 100);
      return fulfillJson(route, {
        status: "success",
        total: matching.length,
        page: Number(params.page || 1),
        totalPages: Math.ceil(matching.length / limit),
        data: { trips: slice(matching, params) },
      });
    },
    "GET /bookings": (route, request) => {
      const params = paramsOf(request);
      requests.push(params);
      const limit = Number(params.limit || 10);
      return fulfillJson(route, {
        status: "success",
        data: {
          bookings: slice(BOOKINGS, params),
          pagination: { total: BOOKINGS.length, page: Number(params.page || 1), pages: Math.ceil(BOOKINGS.length / limit) },
        },
      });
    },
  });

  await page.goto(path);
  return requests;
}

test.use({ viewport: { width: 1440, height: 900 } });

test.describe("Admin trips pagination", () => {
  test("loads 10 trips per page from the server and moves between pages", async ({ page }, testInfo) => {
    const requests = await openAdminPage(page, "/admin/trips");
    const rows = page.locator("tbody tr");

    await expect(rows).toHaveCount(PAGE_SIZE);
    await expect(rows.first()).toContainText("Trip 01");
    await expect(page.getByTestId("pagination-summary")).toHaveText("Showing 1–10 of 23 trips");
    await expect(page.getByRole("button", { name: "Previous page" })).toBeDisabled();
    // Only one page of rows, and only the columns the table shows, was requested.
    expect(requests[0]).toMatchObject({ page: "1", limit: "10" });
    expect(requests[0].fields).toContain("name");

    await page.getByRole("button", { name: "Next page" }).click();
    await expect(rows.first()).toContainText("Trip 11");
    await expect(page.getByTestId("pagination-summary")).toHaveText("Showing 11–20 of 23 trips");

    await page.getByRole("button", { name: "Page 3", exact: true }).click();
    await expect(rows).toHaveCount(3);
    await expect(rows.first()).toContainText("Trip 21");
    await expect(page.getByTestId("pagination-summary")).toHaveText("Showing 21–23 of 23 trips");
    await expect(page.getByRole("button", { name: "Page 3", exact: true })).toHaveAttribute("aria-current", "page");
    await expect(page.getByRole("button", { name: "Next page" })).toBeDisabled();
    expect(requests.at(-1)).toMatchObject({ page: "3", limit: "10" });

    await page.getByRole("navigation", { name: "Pagination" }).scrollIntoViewIfNeeded();
    await page.screenshot({ path: testInfo.outputPath("admin-trips-pagination.png") });
  });

  test("searching and filtering run on the server and return to page 1", async ({ page }) => {
    const requests = await openAdminPage(page, "/admin/trips");
    const rows = page.locator("tbody tr");
    await page.getByRole("button", { name: "Page 2", exact: true }).click();
    await expect(rows.first()).toContainText("Trip 11");

    await page.getByPlaceholder("Search trips...").fill("trip 2");
    await expect(page.getByTestId("pagination-summary")).toHaveText("Showing 1–4 of 4 trips");
    await expect(rows).toHaveCount(4);
    expect(requests.at(-1)).toMatchObject({ page: "1", q: "trip 2" });
    // One page of results needs no page buttons.
    await expect(page.getByRole("button", { name: "Next page" })).toHaveCount(0);

    await page.getByPlaceholder("Search trips...").fill("");
    await expect(page.getByTestId("pagination-summary")).toHaveText("Showing 1–10 of 23 trips");

    await page.getByRole("button", { name: "Page 2", exact: true }).click();
    await page.getByRole("button", { name: "Retreats", exact: true }).click();
    await expect(page.getByTestId("pagination-summary")).toHaveText("Showing 1–4 of 4 trips");
    expect(requests.at(-1)).toMatchObject({ page: "1", tripCategory: "retreats" });
  });

  test("shows no pagination bar when nothing matches", async ({ page }) => {
    await openAdminPage(page, "/admin/trips");

    await page.getByPlaceholder("Search trips...").fill("no such trip");

    await expect(page.getByText("No trips found")).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Pagination" })).toHaveCount(0);
  });
});

test.describe("Admin bookings pagination", () => {
  test("uses the same pagination bar, 10 bookings per page", async ({ page }) => {
    const requests = await openAdminPage(page, "/admin/bookings");
    const rows = page.locator("tbody tr");

    await expect(rows).toHaveCount(PAGE_SIZE);
    await expect(page.getByTestId("pagination-summary")).toHaveText("Showing 1–10 of 34 bookings");
    expect(requests[0]).toMatchObject({ page: "1", limit: "10" });

    // With four pages, the last one is reachable directly.
    await page.getByRole("button", { name: "Page 4", exact: true }).click();
    await expect(rows).toHaveCount(4);
    await expect(rows.first()).toContainText("Customer 31");
    await expect(page.getByTestId("pagination-summary")).toHaveText("Showing 31–34 of 34 bookings");

    await page.getByRole("button", { name: "Previous page" }).click();
    await expect(rows.first()).toContainText("Customer 21");
    expect(requests.at(-1)).toMatchObject({ page: "3", limit: "10" });
  });
});
