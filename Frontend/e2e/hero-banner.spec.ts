import { test, expect, type Page } from "@playwright/test";
import { fulfillJson, mockAdminSession, mockApi, mockBannerImages } from "./helpers/api";

const DESKTOP_IMAGE = "https://img.test/desktop-1600x900.svg";
const MOBILE_IMAGE = "https://img.test/mobile-1080x1350.svg";

const CTAS = [
  { _id: "c1", label: "Explore Trips", url: "/group-trips", style: "solid", bgColor: "#188558", textColor: "#FFFFFF", openInNewTab: false },
  { _id: "c2", label: "Plan My Journey", url: "https://example.com/plan", style: "solid", bgColor: "#F59E0B", textColor: "#1F2937", openInNewTab: true },
  { _id: "c3", label: "Contact Us", url: "/contact", style: "outline", bgColor: "#FFFFFF", textColor: "#FFFFFF", openInNewTab: false },
];

const FULL_SLIDE = {
  _id: "slide-1",
  imageUrl: DESKTOP_IMAGE,
  mobileImageUrl: MOBILE_IMAGE,
  title: "Journeys to the Sacred Himalayas",
  subtitle: "Pilgrimages, retreats and guided tours across Nepal, Bhutan, Tibet and India",
  ctas: CTAS,
  order: 1,
  isActive: true,
};

const IMAGE_ONLY_SLIDE = {
  _id: "slide-2",
  imageUrl: DESKTOP_IMAGE,
  mobileImageUrl: "",
  title: "",
  subtitle: "",
  ctas: [],
  order: 1,
  isActive: true,
};

async function openHomeWith(page: Page, slides: unknown[]) {
  await mockBannerImages(page);
  await mockApi(page, {
    "GET /hero-images/active": (route) =>
      fulfillJson(route, { status: "success", results: slides.length, data: { heroImages: slides } }),
  });
  await page.goto("/");
  await expect(page.getByTestId("hero-banner")).toBeVisible();
}

async function bannerRatio(page: Page) {
  const box = await page.getByTestId("hero-banner").boundingBox();
  return box!.width / box!.height;
}

test.describe("Hero banner on desktop", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("shows the tagline, sub line and colored buttons over the desktop banner", async ({ page }, testInfo) => {
    await openHomeWith(page, [FULL_SLIDE]);
    const banner = page.getByTestId("hero-banner");

    await expect(banner.getByRole("heading", { level: 1, name: FULL_SLIDE.title })).toBeVisible();
    await expect(banner.getByText(FULL_SLIDE.subtitle)).toBeVisible();
    await expect(page.getByTestId("hero-banner-image")).toHaveAttribute("src", DESKTOP_IMAGE);

    const explore = banner.getByRole("link", { name: "Explore Trips" });
    await expect(explore).toHaveAttribute("href", "/group-trips");
    await expect(explore).toHaveCSS("background-color", "rgb(24, 133, 88)");
    await expect(explore).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(explore).not.toHaveAttribute("target", "_blank");

    const plan = banner.getByRole("link", { name: "Plan My Journey" });
    await expect(plan).toHaveAttribute("href", "https://example.com/plan");
    await expect(plan).toHaveAttribute("target", "_blank");
    await expect(plan).toHaveAttribute("rel", /noopener/);
    await expect(plan).toHaveCSS("background-color", "rgb(245, 158, 11)");
    await expect(plan).toHaveCSS("color", "rgb(31, 41, 55)");

    const contact = banner.getByRole("link", { name: "Contact Us" });
    await expect(contact).toHaveCSS("border-top-color", "rgb(255, 255, 255)");
    await expect(contact).not.toHaveCSS("background-color", "rgb(255, 255, 255)");

    // Let the entrance animation settle before the picture is taken.
    await page.waitForTimeout(1200);
    await banner.screenshot({ path: testInfo.outputPath("hero-desktop.png") });
  });

  test("a button with a page link navigates inside the site", async ({ page }) => {
    await openHomeWith(page, [FULL_SLIDE]);

    await page.getByTestId("hero-banner").getByRole("link", { name: "Explore Trips" }).click();

    await expect(page).toHaveURL(/\/group-trips$/);
  });

  test("a banner without any content stays a clean image", async ({ page }) => {
    await openHomeWith(page, [IMAGE_ONLY_SLIDE]);
    const banner = page.getByTestId("hero-banner");

    await expect(page.getByTestId("hero-banner-image")).toHaveAttribute("src", DESKTOP_IMAGE);
    await expect(banner.getByRole("heading")).toHaveCount(0);
    await expect(banner.getByRole("link")).toHaveCount(0);
    await expect(page.getByTestId("hero-banner-content")).toHaveCount(0);
    expect(await bannerRatio(page)).toBeCloseTo(16 / 9, 1);
  });

  test("shows only the pieces that were filled in", async ({ page }) => {
    await openHomeWith(page, [{ ...FULL_SLIDE, subtitle: "", ctas: [CTAS[0]] }]);
    const banner = page.getByTestId("hero-banner");

    await expect(banner.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(banner.getByText(FULL_SLIDE.subtitle)).toHaveCount(0);
    await expect(banner.getByRole("link")).toHaveCount(1);
  });
});

test.describe("Hero banner on mobile", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test("uses the 4:5 mobile banner and keeps all content inside it", async ({ page }, testInfo) => {
    await openHomeWith(page, [FULL_SLIDE]);
    const banner = page.getByTestId("hero-banner");

    await expect(page.getByTestId("hero-banner-image")).toHaveAttribute("src", MOBILE_IMAGE);
    await expect(banner.getByRole("link")).toHaveCount(3);
    await page.waitForTimeout(1200);

    expect(await bannerRatio(page)).toBeCloseTo(4 / 5, 2);

    // Nothing may spill out of the banner or off the side of the screen.
    const frame = (await banner.boundingBox())!;
    const pieces = [banner.getByRole("heading", { level: 1 }), banner.getByText(FULL_SLIDE.subtitle), ...(await banner.getByRole("link").all())];
    for (const piece of pieces) {
      const box = (await piece.boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(frame.x);
      expect(box.x + box.width).toBeLessThanOrEqual(frame.x + frame.width);
      expect(box.y).toBeGreaterThanOrEqual(frame.y);
      expect(box.y + box.height).toBeLessThanOrEqual(frame.y + frame.height);
    }

    await banner.screenshot({ path: testInfo.outputPath("hero-mobile.png") });
  });

  test("falls back to the desktop banner when no mobile banner was uploaded", async ({ page }) => {
    await openHomeWith(page, [IMAGE_ONLY_SLIDE]);

    await expect(page.getByTestId("hero-banner-image")).toHaveAttribute("src", DESKTOP_IMAGE);
    // Shown whole, in its own landscape shape.
    await expect.poll(() => bannerRatio(page)).toBeCloseTo(16 / 9, 1);
  });

  test("still gives buttons a 4:5 frame without a mobile banner", async ({ page }) => {
    await openHomeWith(page, [{ ...FULL_SLIDE, mobileImageUrl: "" }]);

    await expect(page.getByTestId("hero-banner-image")).toHaveAttribute("src", DESKTOP_IMAGE);
    await expect(page.getByTestId("hero-banner").getByRole("link")).toHaveCount(3);
    expect(await bannerRatio(page)).toBeCloseTo(4 / 5, 2);
  });
});

// 1x1 PNG, enough for the upload inputs.
const TINY_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
  "base64"
);

// What the editor sends to the API on save.
interface SavedBanner {
  imageUrl: string;
  mobileImageUrl: string;
  title: string;
  subtitle: string;
  ctas: { label: string; url: string; style: string; bgColor: string; textColor: string; openInNewTab: boolean }[];
}

test.describe("Admin hero banner editor", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  async function openAdmin(page: Page, existing: unknown[], extra: Parameters<typeof mockApi>[1] = {}) {
    await mockBannerImages(page);
    const session = await mockAdminSession(page);
    await mockApi(page, {
      ...session,
      "GET /hero-images": (route) =>
        fulfillJson(route, { status: "success", results: existing.length, data: { heroImages: existing } }),
      ...extra,
    });
    await page.goto("/admin/homepage/hero");
    await expect(page.getByRole("heading", { name: "Hero Section Management" })).toBeVisible();
  }

  test("creates a banner with a mobile image, content and colored buttons", async ({ page }, testInfo) => {
    let created = null as SavedBanner | null;
    await openAdmin(page, [], {
      "POST /hero-images": async (route, request) => {
        created = request.postDataJSON();
        await fulfillJson(route, { status: "success", data: { heroImage: { _id: "new", ...created } } }, 201);
      },
    });

    await page.getByRole("button", { name: "Add Hero Image" }).first().click();

    await page.getByLabel("Desktop banner image", { exact: true }).setInputFiles({ name: "desktop.png", mimeType: "image/png", buffer: TINY_PNG });
    await page.getByLabel("Mobile banner image", { exact: true }).setInputFiles({ name: "mobile.png", mimeType: "image/png", buffer: TINY_PNG });
    await expect(page.getByAltText("Mobile preview")).toBeVisible();

    await page.getByLabel("Main Tagline (Optional)").fill("Journeys to the Sacred Himalayas");
    await page.getByLabel("Sub Line (Optional)").fill("Pilgrimages, retreats and guided tours");

    await page.getByRole("button", { name: "Add Button" }).click();
    await page.getByLabel("Button 1 label").fill("Explore Trips");
    await page.getByLabel("Button 1 link").fill("/group-trips");

    await page.getByRole("button", { name: "Add Button" }).click();
    await page.getByLabel("Button 2 label").fill("Plan My Journey");
    await page.getByLabel("Button 2 link").fill("https://example.com/plan");
    await page.getByLabel("Button 2 color", { exact: true }).fill("#F59E0B");
    await page.getByLabel("Set button 2 text color to #1F2937").click();
    await page.getByLabel("Open button 2 in a new tab").check();

    await page.getByRole("button", { name: "Add Button" }).click();
    await page.getByLabel("Button 3 label").fill("Contact Us");
    await page.getByLabel("Button 3 link").fill("/contact");
    await page.getByLabel("Button 3 style").selectOption("outline");
    await page.getByLabel("Set button 3 color to #FFFFFF").click();

    // The live preview paints each button in its own colors.
    const preview = page.getByTestId("hero-cta-preview");
    await expect(preview.getByText("Plan My Journey")).toHaveCSS("background-color", "rgb(245, 158, 11)");
    await expect(preview.getByText("Plan My Journey")).toHaveCSS("color", "rgb(31, 41, 55)");
    await page.getByTestId("hero-cta-row-2").scrollIntoViewIfNeeded();
    await page.screenshot({ path: testInfo.outputPath("admin-editor.png") });

    await page.getByRole("button", { name: "Create", exact: true }).click();
    await expect(page.getByText("Hero image created successfully").first()).toBeVisible();

    expect(created!.imageUrl).toMatch(/^data:image\/png;base64,/);
    expect(created!.mobileImageUrl).toMatch(/^data:image\/png;base64,/);
    expect(created!.title).toBe("Journeys to the Sacred Himalayas");
    expect(created!.subtitle).toBe("Pilgrimages, retreats and guided tours");
    expect(created!.ctas).toEqual([
      { label: "Explore Trips", url: "/group-trips", style: "solid", bgColor: "#188558", textColor: "#FFFFFF", openInNewTab: false },
      { label: "Plan My Journey", url: "https://example.com/plan", style: "solid", bgColor: "#F59E0B", textColor: "#1F2937", openInNewTab: true },
      { label: "Contact Us", url: "/contact", style: "outline", bgColor: "#FFFFFF", textColor: "#FFFFFF", openInNewTab: false },
    ]);
  });

  test("saves a plain banner when every optional field is left empty", async ({ page }) => {
    let created = null as SavedBanner | null;
    await openAdmin(page, [], {
      "POST /hero-images": async (route, request) => {
        created = request.postDataJSON();
        await fulfillJson(route, { status: "success", data: { heroImage: { _id: "new", ...created } } }, 201);
      },
    });

    await page.getByRole("button", { name: "Add Hero Image" }).first().click();
    await page.getByLabel("Desktop banner image URL").fill(DESKTOP_IMAGE);
    // An untouched button row is simply ignored.
    await page.getByRole("button", { name: "Add Button" }).click();
    await page.getByRole("button", { name: "Create", exact: true }).click();

    await expect(page.getByText("Hero image created successfully").first()).toBeVisible();
    expect(created).toMatchObject({ imageUrl: DESKTOP_IMAGE, mobileImageUrl: "", title: "", subtitle: "", ctas: [] });
  });

  test("edits an existing banner: reorders and removes buttons, drops the mobile image", async ({ page }) => {
    let updated = null as SavedBanner | null;
    await openAdmin(page, [FULL_SLIDE], {
      "PATCH /hero-images/slide-1": async (route, request) => {
        updated = request.postDataJSON();
        await fulfillJson(route, { status: "success", data: { heroImage: { ...FULL_SLIDE, ...updated } } });
      },
    });

    await expect(page.getByText("Mobile banner", { exact: true })).toBeVisible();
    await expect(page.getByText("3 buttons")).toBeVisible();

    await page.getByRole("button", { name: "Edit" }).click();
    await expect(page.getByLabel("Main Tagline (Optional)")).toHaveValue(FULL_SLIDE.title);
    await expect(page.getByLabel("Button 2 label")).toHaveValue("Plan My Journey");
    await expect(page.getByLabel("Button 2 color", { exact: true })).toHaveValue("#F59E0B");
    await expect(page.getByLabel("Open button 2 in a new tab")).toBeChecked();

    await page.getByRole("button", { name: "Remove button 1" }).click();
    await page.getByRole("button", { name: "Move button 2 up" }).click();
    await page.getByRole("button", { name: "Remove mobile banner" }).click();
    await page.getByRole("button", { name: "Update", exact: true }).click();

    await expect(page.getByText("Hero image updated successfully").first()).toBeVisible();
    expect(updated!.mobileImageUrl).toBe("");
    expect(updated!.ctas.map((cta) => cta.label)).toEqual(["Contact Us", "Plan My Journey"]);
  });

  test("refuses a half-filled button or an unsafe link", async ({ page }) => {
    let requests = 0;
    await openAdmin(page, [], {
      "POST /hero-images": async (route) => {
        requests += 1;
        await fulfillJson(route, { status: "success", data: { heroImage: {} } }, 201);
      },
    });

    await page.getByRole("button", { name: "Add Hero Image" }).first().click();
    await page.getByLabel("Desktop banner image URL").fill(DESKTOP_IMAGE);
    await page.getByRole("button", { name: "Add Button" }).click();
    await page.getByLabel("Button 1 label").fill("Explore Trips");
    await page.getByRole("button", { name: "Create", exact: true }).click();
    await expect(page.getByText("Button 1 needs both a label and a link").first()).toBeVisible();

    await page.getByLabel("Button 1 link").fill("javascript:alert(1)");
    await page.getByRole("button", { name: "Create", exact: true }).click();
    await expect(page.getByText(/Button 1 link must be a page path/).first()).toBeVisible();

    expect(requests).toBe(0);
  });
});
