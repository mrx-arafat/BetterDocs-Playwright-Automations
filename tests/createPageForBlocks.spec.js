import { test, expect } from "@playwright/test";

test.use({ storageState: "betterdocs-arafatbytes.json" });

test.setTimeout(120000);

test("Create multiple pages with predefined titles", async ({ page }) => {
  await page.goto(
    "https://betterdocs.arafatbytes.live/wp-admin/post-new.php?post_type=page"
  );
  console.log("Navigated directly to the 'Add New Page' page");

  const titles = ["page 01", "page 02", "page 03", "page 04"];

  for (let i = 0; i < titles.length; i++) {
    const title = titles[i];

    console.log(`Creating Page ${i + 1}: ${title}`);
    await page.getByLabel("Add title").fill(title);

    await page.getByRole("button", { name: "Publish", exact: true }).click();
    await page
      .getByLabel("Editor publish")
      .getByRole("button", { name: "Publish", exact: true })
      .click();

    console.log(`Page ${i + 1} titled "${title}" published successfully.`);

    await page.waitForSelector(".components-snackbar__content", {
      timeout: 15000,
    });

    await page.waitForTimeout(2000);

    if (i < titles.length - 1) {
      for (let retry = 0; retry < 3; retry++) {
        try {
          await page.goto(
            "https://betterdocs.arafatbytes.live/wp-admin/post-new.php?post_type=page"
          );
          await page.waitForLoadState("domcontentloaded");
          console.log(
            "Navigating to the 'Add New Page' page for the next page"
          );
          break;
        } catch (error) {
          console.log(`Retrying navigation due to error: ${error.message}`);
          if (retry === 2) {
            throw new Error("Failed to navigate after 3 retries");
          }
        }
      }
    }
  }

  console.log("All pages have been created successfully.");
});
