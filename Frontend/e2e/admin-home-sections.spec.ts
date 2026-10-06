import { test, expect, type Page } from "@playwright/test";
import { fulfillJson, mockAdminSession, mockApi, mockBannerImages } from "./helpers/api";

const makeTrip = (id: string, name: string, destination: string, status = "Active") => ({
  _id: id,
  name,
  image: "https://img.test/trip-1200x900.svg",
  duration: "8 Days / 7 Nights",
  destination,
  price: 200000,
  priceUSD: 1500,
  status,
});

// The trips already created under Admin > Trips.
const CATALOGUE = [
  makeTrip("t1", "Kailash Mansarovar Yatra by Helicopter", "Tibet"),
  makeTrip("t2", "Lhasa and Everest Base Camp Tour", "Tibet"),
  makeTrip("t3", "Vipassana Weekend Retreat", "Nepal"),
  makeTrip("t4", "Bhutan Spiritual and Heritage Tour", "Bhutan"),
  makeTrip("t5", "World Peace Prayer at Borobudur", "Indonesia"),
];

const SECTION_KEYS = ["upcoming-group", "kailash-tibet", "wellness-tours", "world-peace-prayer", "pilgrimage-tours", "dharma-events", "activities"];

interface SavedSection {
  key: string;
  tripIds: string[];
}

async function openAdmin(page: Page, initial: Record<string, string[]>) {
  const saves: SavedSection[] = [];
  const byId = (id: string) => CATALOGUE.find((trip) => trip._id === id)!;

  await mockBannerImages(page);
  const session = await mockAdminSession(page);
  await mockApi(page, {
    ...session,
    "GET /home-sections": (route) =>
      fulfillJson(route, {
        status: "success",
        data: { sections: SECTION_KEYS.map((key) => ({ key, route: `/trips/${key}`, trips: (initial[key] ?? []).map(byId) })) },
      }),
    "GET /trips": (route) =>
      fulfillJson(route, { status: "success", results: CATALOGUE.length, data: { trips: CATALOGUE } }),
    ...Object.fromEntries(
      SECTION_KEYS.map((key) => [
        `PUT /home-sections/${key}`,
        async (route, request) => {
          const { tripIds } = request.postDataJSON() as { tripIds: string[] };
          saves.push({ key, tripIds });
          await fulfillJson(route, { status: "success", data: { key, trips: tripIds.map(byId) } });
        },
      ])
    ) as Parameters<typeof mockApi>[1],
  });

  await page.goto("/admin/homepage/sections");
  await expect(page.getByRole("heading", { name: "Homepage Tour Sections" })).toBeVisible();
  return saves;
}

test.use({ viewport: { width: 1440, height: 900 } });

test.describe("Admin homepage tour sections", () => {
  test("is reachable from the Homepage menu and has a tab per section", async ({ page }) => {
    await openAdmin(page, { "kailash-tibet": ["t1", "t2"] });

    await expect(page.getByRole("button", { name: "Tour Sections" })).toBeVisible();
    for (const title of [
      "Upcoming Group Trips",
      "Top Selling Kailash Mansarovar & Tibet Trip Packages",
      "Wellness Tours",
      "World Peace Prayer",
      "Pilgrimage Tours",
      "Empowerment, Transmission, Teachings & Puja",
      "Trip by Activities",
    ]) {
      await expect(page.getByRole("tab", { name: title })).toBeVisible();
    }
    // Each tab carries the number of trips it holds.
    await expect(page.getByRole("tab", { name: /Top Selling Kailash/ })).toContainText("2");
    await expect(page.getByRole("tab", { name: "Wellness Tours" })).toContainText("0");
  });

  test("adds several existing trips to a section in one go", async ({ page }, testInfo) => {
    const saves = await openAdmin(page, {});

    await page.getByRole("tab", { name: "Wellness Tours" }).click();
    await expect(page.getByText("No trips in this section yet")).toBeVisible();

    await page.getByRole("button", { name: "Add Trips" }).first().click();
    const picker = page.getByRole("dialog", { name: "Add trips to Wellness Tours" });
    await expect(picker.getByRole("checkbox")).toHaveCount(CATALOGUE.length);

    // Search narrows the catalogue by name or destination.
    await picker.getByLabel("Search trips").fill("bhutan");
    await expect(picker.getByRole("checkbox")).toHaveCount(1);
    await picker.getByRole("checkbox", { name: "Bhutan Spiritual and Heritage Tour" }).check();

    await picker.getByLabel("Search trips").fill("");
    await picker.getByRole("checkbox", { name: "Vipassana Weekend Retreat" }).check();
    await expect(picker.getByText("2 selected")).toBeVisible();
    await page.screenshot({ path: testInfo.outputPath("admin-sections-picker.png") });

    await picker.getByRole("button", { name: "Add 2 Trips" }).click();

    await expect(page.getByText("2 trips added to Wellness Tours.").first()).toBeVisible();
    await expect(page.getByTestId("section-trip")).toHaveCount(2);
    await expect(page.getByRole("tab", { name: "Wellness Tours" })).toContainText("2");
    expect(saves).toEqual([{ key: "wellness-tours", tripIds: ["t4", "t3"] }]);
    await page.screenshot({ path: testInfo.outputPath("admin-sections-list.png") });
  });

  test("marks trips already in the section and keeps them when adding more", async ({ page }) => {
    const saves = await openAdmin(page, { "kailash-tibet": ["t1"] });

    await page.getByRole("tab", { name: /Top Selling Kailash/ }).click();
    await page.getByRole("button", { name: "Add Trips" }).click();
    const picker = page.getByRole("dialog");

    const existing = picker.getByRole("checkbox", { name: "Kailash Mansarovar Yatra by Helicopter" });
    await expect(existing).toBeChecked();
    await expect(existing).toBeDisabled();
    await expect(picker.getByRole("button", { name: "Add Trip" })).toBeDisabled();

    await picker.getByRole("checkbox", { name: "Lhasa and Everest Base Camp Tour" }).check();
    await picker.getByRole("button", { name: "Add Trip" }).click();

    await expect(page.getByTestId("section-trip")).toHaveCount(2);
    expect(saves).toEqual([{ key: "kailash-tibet", tripIds: ["t1", "t2"] }]);
  });

  test("reorders and removes trips, saving each change", async ({ page }) => {
    const saves = await openAdmin(page, { "upcoming-group": ["t1", "t2", "t3"] });
    const rows = page.getByTestId("section-trip");
    await expect(rows).toHaveCount(3);

    await page.getByRole("button", { name: "Move Vipassana Weekend Retreat up" }).click();
    await expect(page.getByText("Order updated.").first()).toBeVisible();
    await expect(rows.nth(1)).toContainText("Vipassana Weekend Retreat");

    await page.getByRole("button", { name: "Remove Kailash Mansarovar Yatra by Helicopter from this section" }).click();
    await expect(rows).toHaveCount(2);
    await expect(rows.nth(0)).toContainText("Vipassana Weekend Retreat");

    expect(saves).toEqual([
      { key: "upcoming-group", tripIds: ["t1", "t3", "t2"] },
      { key: "upcoming-group", tripIds: ["t3", "t2"] },
    ]);
  });

  test("shows which trips make the homepage and which sit under View All", async ({ page }) => {
    await openAdmin(page, { "upcoming-group": ["t1", "t2", "t3", "t4", "t5"] });
    const rows = page.getByTestId("section-trip");

    await expect(rows.nth(3)).toContainText("On homepage");
    await expect(rows.nth(4)).toContainText("Under View All");
  });

  test("puts the list back and says so when a save fails", async ({ page }) => {
    await openAdmin(page, { "upcoming-group": ["t1", "t2"] });
    await page.route("**/api/v1/home-sections/upcoming-group", (route) =>
      route.request().method() === "PUT"
        ? fulfillJson(route, { status: "error", message: "One of the selected trips no longer exists" }, 400)
        : route.fallback()
    );

    await page.getByRole("button", { name: "Remove Lhasa and Everest Base Camp Tour from this section" }).click();

    await expect(page.getByText("One of the selected trips no longer exists").first()).toBeVisible();
    await expect(page.getByTestId("section-trip")).toHaveCount(2);
  });
});
