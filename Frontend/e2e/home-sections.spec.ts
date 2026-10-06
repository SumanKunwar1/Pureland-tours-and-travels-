import { test, expect, type Page } from "@playwright/test";
import { fulfillJson, mockAdminSession, mockApi, mockBannerImages } from "./helpers/api";

const IMAGE = "https://img.test/trip-1200x900.svg";

// Trips as the API returns them, each tagged with the listing routes it was ticked for.
const makeTrip = (id: string, name: string, tripRoute: string[]) => ({
  _id: id,
  name,
  image: IMAGE,
  duration: "8 Days / 7 Nights",
  price: 200000,
  priceUSD: 1500,
  originalPrice: 203000,
  discount: 3000,
  dates: [{ date: "12 Nov 2026", price: 200000 }],
  destination: "Tibet",
  hasGoodies: false,
  tripRoute,
});

const TRIPS = [
  makeTrip("k1", "Kailash Mansarovar Yatra by Helicopter", ["/trips/kailash-tibet"]),
  makeTrip("k2", "Lhasa and Everest Base Camp Tour", ["/trips/kailash-tibet", "/trips/group"]),
  makeTrip("w1", "Vipassana Weekend Retreat", ["/trips/wellness"]),
  makeTrip("p1", "World Peace Prayer at Borobudur", ["/trips/world-peace-prayer"]),
  makeTrip("g1", "Pilgrimage with Venerable Rinpoche", ["/trips/pilgrimage"]),
  makeTrip("d1", "Kalachakra Empowerment", ["/trips/dharma-events"]),
  // Nothing is assigned to /trips/activities, so that section shows its empty state.
];

const DESTINATIONS = ["Nepal", "Bhutan", "Tibet", "India", "Sri Lanka", "Thailand", "Japan", "Cambodia", "Vietnam", "China"].map(
  (name, index) => ({
    _id: `dest-${index}`,
    name,
    slug: name.toLowerCase().replace(/ /g, "-"),
    image: "https://img.test/dest-400x400.svg",
    type: "international",
    url: "/international-trips",
    order: index + 1,
    isActive: true,
  })
);

// Section key -> listing route, as defined in the backend's HomeSection model.
const SECTION_ROUTES: Record<string, string> = {
  "upcoming-group": "/trips/group",
  "kailash-tibet": "/trips/kailash-tibet",
  "wellness-tours": "/trips/wellness",
  "world-peace-prayer": "/trips/world-peace-prayer",
  "pilgrimage-tours": "/trips/pilgrimage",
  "dharma-events": "/trips/dharma-events",
  activities: "/trips/activities",
};

// GET /home-sections/:key for every section, answering from the given trips.
function homeSectionHandlers(trips: typeof TRIPS): Parameters<typeof mockApi>[1] {
  return Object.fromEntries(
    Object.entries(SECTION_ROUTES).map(([key, sectionRoute]) => [
      `GET /home-sections/${key}`,
      (route) => {
        const sectionTrips = trips.filter((trip) => trip.tripRoute.includes(sectionRoute));
        return fulfillJson(route, { status: "success", results: sectionTrips.length, data: { key, trips: sectionTrips } });
      },
    ])
  );
}

async function openHome(page: Page, extra: Parameters<typeof mockApi>[1] = {}) {
  await mockBannerImages(page);
  await mockApi(page, {
    ...homeSectionHandlers(TRIPS),
    // Still used by the "View All" listing pages.
    "GET /trips": (route, request) => {
      const wanted = new URL(request.url()).searchParams.get("tripRoute");
      const trips = TRIPS.filter((trip) => !wanted || trip.tripRoute.includes(wanted));
      return fulfillJson(route, { status: "success", results: trips.length, data: { trips } });
    },
    "GET /explore-destinations/active": (route) =>
      fulfillJson(route, { status: "success", data: { exploreDestinations: DESTINATIONS } }),
    ...extra,
  });
  await page.goto("/");
  await expect(page.getByTestId("tour-section-kailash-tibet")).toBeVisible();
}

// Sections fade in as they scroll into view, so walk the page once before a
// full-page picture or a whole-page measurement.
async function revealWholePage(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 250) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1000);
}

test.describe("Homepage sections on desktop", () => {  test.use({ viewport: { width: 1440, height: 900 } });

  test("each tour section lists only the trips ticked for it", async ({ page }) => {
    await openHome(page);

    const kailash = page.getByTestId("tour-section-kailash-tibet");
    await expect(kailash.getByRole("heading", { level: 2 })).toHaveText("Top Selling Kailash Mansarovar & Tibet Trip Packages");
    await expect(kailash.getByText("Explore our top-selling packages and book your seat today.")).toBeVisible();
    await expect(kailash.getByTestId("tour-card")).toHaveCount(2);
    await expect(kailash.getByRole("link", { name: "View all Top Selling Kailash" })).toHaveAttribute("href", "/trips/kailash-tibet");

    const wellness = page.getByTestId("tour-section-wellness-tours");
    await expect(wellness.getByRole("heading", { level: 2 })).toHaveText("Wellness Tours");
    await expect(wellness.getByText(/Ngyungne Retreat • Vipassana Meditation/)).toBeVisible();
    await expect(wellness.getByTestId("tour-card")).toHaveCount(1);
    await expect(wellness.getByText("Vipassana Weekend Retreat")).toBeVisible();

    await expect(page.getByTestId("tour-section-world-peace-prayer").getByText("World Peace Prayer at Borobudur")).toBeVisible();
    await expect(page.getByTestId("tour-section-pilgrimage-tours").getByText("Pilgrimage with Venerable Rinpoche", { exact: true })).toBeVisible();
    await expect(page.getByTestId("tour-section-dharma-events").getByText("Kalachakra Empowerment")).toBeVisible();

    // A section with no trips still shows, inviting visitors to enquire.
    const activities = page.getByTestId("tour-section-activities");
    await expect(activities.getByRole("heading", { level: 2 })).toHaveText("Trip by Activities");
    await expect(activities.getByText("Live Fully • Travel Together • Create Happy Memories")).toBeVisible();
    await expect(activities.getByTestId("tour-card")).toHaveCount(0);
    await expect(activities.getByText("New departures coming soon")).toBeVisible();
    await expect(activities.getByRole("link", { name: "Enquire Now" })).toHaveAttribute("href", "/contact");
    await expect(activities.getByRole("link", { name: /View all/ })).toHaveCount(0);
  });

  test("every tour section from the brief shows even before any trip is assigned", async ({ page }) => {
    await mockApi(page, homeSectionHandlers([]));
    await page.goto("/");

    const sections = {
      "kailash-tibet": "Top Selling Kailash Mansarovar & Tibet Trip Packages",
      "wellness-tours": "Wellness Tours",
      "world-peace-prayer": "World Peace Prayer",
      "pilgrimage-tours": "Pilgrimage Tours",
      "dharma-events": "Empowerment, Transmission, Teachings & Puja",
      activities: "Trip by Activities",
    };
    for (const [id, title] of Object.entries(sections)) {
      const section = page.getByTestId(`tour-section-${id}`);
      await expect(section.getByRole("heading", { level: 2 })).toHaveText(title);
      await expect(section.getByTestId("tour-section-empty")).toBeVisible();
    }
  });

  test("listing sections share one heading style, and Vibe with Us is gone", async ({ page }) => {
    await openHome(page);

    const upcoming = page.getByTestId("upcoming-trips");
    await expect(upcoming.getByText("Join our fixed-departure group journeys and travel with like-minded companions.")).toBeVisible();
    await expect(page.getByTestId("trending-destinations").getByText("The journeys our travellers are booking most right now.")).toBeVisible();

    // Same size, weight and alignment as a tour section heading.
    const reference = page.getByTestId("tour-section-wellness-tours").getByRole("heading", { level: 2 });
    for (const heading of [
      upcoming.getByRole("heading", { level: 2 }),
      page.getByTestId("trending-destinations").getByRole("heading", { level: 2 }),
      page.getByRole("heading", { level: 2, name: "Explore Destinations" }),
    ]) {
      for (const property of ["font-size", "font-weight", "text-align", "font-family"]) {
        const expected = await reference.evaluate((el, prop) => getComputedStyle(el).getPropertyValue(prop), property);
        await expect(heading).toHaveCSS(property, expected);
      }
    }

    await expect(page.getByRole("heading", { name: "Vibe with Us" })).toHaveCount(0);
  });

  test("the sections appear in the requested order", async ({ page }) => {
    await openHome(page);

    const order = await page.locator("main h2").allTextContents();
    const wanted = [
      "Explore Destinations",
      "Trending Destinations",
      "Upcoming Group Trips",
      "Top Selling Kailash Mansarovar & Tibet Trip Packages",
      "Wellness Tours",
      "World Peace Prayer",
      "Pilgrimage Tours",
      "Empowerment, Transmission, Teachings & Puja",
      "Trip by Activities",
      "Book Everything in One Place",
      "Our Core Partners",
      "Become Our B2B Travel Partner",
      "Turn Every Booking Into an Opportunity",
      "Watch Our Trip",
      "Inquiry & Suggestions",
      "Google Reviews",
    ];
    expect(order.filter((title) => wanted.includes(title))).toEqual(wanted);
  });

  test("View Details opens the tour page", async ({ page }) => {
    await openHome(page);

    await page.getByRole("link", { name: "View details of Kailash Mansarovar Yatra by Helicopter" }).click();

    await expect(page).toHaveURL(/\/trip\/k1$/);
  });

  test("Book Now opens the booking form for that tour and submits it", async ({ page }) => {
    let booking: Record<string, unknown> | null = null;
    await openHome(page, {
      "POST /bookings": async (route, request) => {
        booking = request.postDataJSON();
        await fulfillJson(route, { status: "success", data: { booking: {} } }, 201);
      },
    });

    await page.getByRole("button", { name: "Book Vipassana Weekend Retreat now" }).click();

    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { name: "Book: Vipassana Weekend Retreat" })).toBeVisible();

    await page.getByPlaceholder("Your Name *").fill("Test Traveller");
    await page.getByPlaceholder("Email Address *").fill("traveller@example.com");
    await page.getByPlaceholder("Phone Number *").fill("9800000000");
    // The form shows the tour's price before the visitor commits.
    await expect(page.getByText("Total Amount:")).toBeVisible();
    await page.getByRole("button", { name: "Submit Booking Request" }).click();

    await expect(page.getByText("Booking Request Sent!").first()).toBeVisible();
    // The booking carries the tour's real price, not 0.
    expect(booking).toMatchObject({
      tripId: "w1",
      tripName: "Vipassana Weekend Retreat",
      customerName: "Test Traveller",
      travelers: 1,
      selectedPrice: 200000,
      totalAmount: 200000,
    });
  });

  test("partner banners lead to agent sign up and login", async ({ page }) => {
    await openHome(page);
    const partner = page.getByTestId("partner-with-us");

    await expect(partner.getByText("Travel agencies & tour operators are warmly invited to join our partner network.")).toBeVisible();
    await expect(partner.getByRole("link", { name: "Become a Partner" })).toHaveAttribute("href", "/agent-signup");
    await expect(partner.getByRole("link", { name: "Partner Login" })).toHaveAttribute("href", "/agent/login");
    for (const benefit of ["Sell Our Tour Packages", "Earn Attractive Commissions", "Grow Your Business", "Work from Home", "Flexible Opportunity", "No Office Required"]) {
      await expect(partner.getByText(benefit)).toBeVisible();
    }

    await partner.getByRole("link", { name: "Start Earning Today" }).click();
    await expect(page).toHaveURL(/\/agent-signup$/);
  });

  test("services, partners, videos and reviews are in place", async ({ page }) => {
    await openHome(page);

    const services = page.getByTestId("services-section");
    await expect(services.getByText("Services We Offer")).toBeVisible();
    await expect(services.getByRole("link", { name: /Visa Application Assistance/ })).toHaveAttribute("href", "/visa-application");
    await expect(services.getByRole("link", { name: /Travel Insurance/ })).toHaveAttribute("href", "/insurance");
    await expect(services.getByRole("link")).toHaveCount(4);

    const partners = page.getByTestId("core-partners");
    await expect(partners.getByText("Buddhist Teaching & Meditation Centre")).toBeVisible();
    await expect(partners.getByText("Dharma Television Channel")).toBeVisible();

    await expect(page.getByTestId("watch-our-trip").getByRole("link", { name: "Watch on Instagram" })).toHaveAttribute("href", /instagram\.com/);
    await expect(page.getByTestId("google-review").getByRole("link", { name: /Google Review/ })).toHaveAttribute("href", /google\.com\/maps/);
    // Removed from the homepage on every screen size.
    await expect(page.getByRole("heading", { name: "Book with Confidence" })).toHaveCount(0);
  });

  test("the inquiry form sends the message to the team", async ({ page }) => {
    let sent: Record<string, unknown> | null = null;
    await openHome(page, {
      "POST /custom-trips": async (route, request) => {
        sent = request.postDataJSON();
        await fulfillJson(route, { status: "success", data: { customTrip: {} } }, 201);
      },
    });
    const inquiry = page.getByTestId("inquiry-section");

    await inquiry.getByRole("radio", { name: "Suggestion" }).click();
    await inquiry.getByLabel("Your Name *").fill("Test Traveller");
    await inquiry.getByLabel("Phone / WhatsApp *").fill("9800000000");
    await inquiry.getByLabel("Email Address *").fill("traveller@example.com");
    await inquiry.getByLabel("Your Suggestion *").fill("Please add more Bhutan departures.");
    await inquiry.getByRole("button", { name: "Send Suggestion" }).click();

    await expect(page.getByText("Thank you for your suggestion!").first()).toBeVisible();
    expect(sent).toMatchObject({
      customerName: "Test Traveller",
      email: "traveller@example.com",
      phone: "9800000000",
      destination: "Website Suggestion",
      message: "Please add more Bhutan departures.",
    });
    await expect(inquiry.getByLabel("Your Name *")).toHaveValue("");
  });

  test("a section's View All page lists its trips", async ({ page }) => {
    await openHome(page);

    await page.getByRole("link", { name: "View all Wellness Tours" }).click();

    await expect(page).toHaveURL(/\/trips\/wellness$/);
    await expect(page.getByText("Vipassana Weekend Retreat").first()).toBeVisible();
    await expect(page.getByText("Kalachakra Empowerment")).toHaveCount(0);
  });

  test("takes a full-page picture for review", async ({ page }, testInfo) => {
    await openHome(page);
    await revealWholePage(page);

    await page.screenshot({ path: testInfo.outputPath("home-desktop.png"), fullPage: true });
  });
});

test.describe("Homepage sections on mobile", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test("does not show Book with Confidence", async ({ page }) => {
    await openHome(page);

    await expect(page.getByRole("heading", { name: "Book with Confidence" })).toHaveCount(0);
  });

  test("explore destinations wrap instead of scrolling sideways", async ({ page }) => {
    await openHome(page);
    const grid = page.getByTestId("explore-destinations-grid");
    await expect(grid.getByRole("link")).toHaveCount(DESTINATIONS.length);

    // Every destination sits fully inside the screen width, on several rows.
    const boxes = await Promise.all((await grid.getByRole("link").all()).map((link) => link.boundingBox()));
    for (const box of boxes) {
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(390);
    }
    expect(new Set(boxes.map((box) => Math.round(box!.y))).size).toBeGreaterThan(1);
    expect(await grid.evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
  });

  test("tour cards fit two per row with both buttons, and the page never scrolls sideways", async ({ page }, testInfo) => {
    await openHome(page);
    const cards = page.getByTestId("tour-section-kailash-tibet").getByTestId("tour-card");

    const [first, second] = await Promise.all([cards.nth(0).boundingBox(), cards.nth(1).boundingBox()]);
    expect(Math.round(first!.y)).toBe(Math.round(second!.y));
    expect(second!.x + second!.width).toBeLessThanOrEqual(390);
    await expect(cards.nth(0).getByRole("link", { name: /View details/ })).toBeVisible();
    await expect(cards.nth(0).getByRole("button", { name: /Book .* now/ })).toBeVisible();

    await revealWholePage(page);

    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath("home-mobile.png"), fullPage: true });
  });
});

test.describe("Admin trip form", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("offers the homepage sections as trip types", async ({ page }) => {
    const session = await mockAdminSession(page);
    await mockApi(page, session);
    await page.goto("/admin/trips/create");

    await page.getByRole("button", { name: "Categories & Type" }).click();
    await page.getByText("Homepage Sections", { exact: true }).click();

    for (const label of ["Kailash & Tibet Top Selling", "Wellness Tours", "World Peace Prayer", "Empowerment & Teachings", "Trip by Activities"]) {
      await expect(page.getByText(label, { exact: true })).toBeVisible();
    }

    // Ticking a type files the trip under that section's listing route.
    await page.getByText("Wellness Tours", { exact: true }).click();
    await expect(page.getByText("/trips/wellness", { exact: true })).toBeVisible();
  });
});
