import { test, expect } from "@playwright/test";

test.use({ storageState: "betterdocs-arafatbytes.json" });

test.setTimeout(120000);

test("Create multiple docs in BetterDocs with predefined titles", async ({
  page,
}) => {
  await page.goto(
    "https://betterdocs.arafatbytes.live/wp-admin/post-new.php?post_type=docs"
  );
  console.log("Navigated directly to the 'Add New Doc' page");

  const titles = [
    "Believe You Can and You're Halfway There",
    "The Future Belongs to Those Who Believe in the Beauty of Their Dreams",
    "Success Is Not Final, Failure Is Not Fatal: It Is the Courage to Continue That Counts",
    "Don't Watch the Clock; Do What It Does. Keep Going",
    "You Miss 100% of the Shots You Don't Take",
    "I Have Not Failed. I've Just Found 10,000 Ways That Won't Work",
    "You Are Never Too Old to Set Another Goal or to Dream a New Dream",
    "The Only Way to Do Great Work Is to Love What You Do",
    "It Always Seems Impossible Until It's Done",
    "You Don't Have to Be Great to Start, But You Have to Start to Be Great",
  ];

  for (let i = 0; i < titles.length; i++) {
    const title = titles[i];

    console.log(`Creating Document ${i + 1}: ${title}`);
    await page.getByLabel("Add title").fill(title);

    await page.getByRole("button", { name: "Publish", exact: true }).click();
    await page
      .getByLabel("Editor publish")
      .getByRole("button", { name: "Publish", exact: true })
      .click();

    console.log(`Document ${i + 1} titled "${title}" published successfully.`);

    await page.waitForSelector(".components-snackbar__content", {
      timeout: 15000,
    });

    await page.waitForTimeout(2000);

    if (i < titles.length - 1) {
      for (let retry = 0; retry < 3; retry++) {
        try {
          await page.goto(
            "https://betterdocs.arafatbytes.live/wp-admin/post-new.php?post_type=docs"
          );
          await page.waitForLoadState("domcontentloaded");
          console.log(
            "Navigating to the 'Add New Doc' page for the next document"
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

  console.log("All documents have been created successfully.");
});
