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
    "Start Where You Are, Use What You Have, Do What You Can",
    "If You Can Dream It, You Can Do It",
    "Believe in the Power of Yet",
    "Do What You Can with All You Have, Wherever You Are",
    "Success Starts with Self-Discipline",
    "Think Big and Don’t Listen to People Who Tell You It Can’t Be Done",
    "Push Yourself Because No One Else is Going to Do It for You",
    "Opportunities Don’t Happen, You Create Them",
    "Your Only Limit is Your Mind",
    "Don’t Be Afraid to Fail, Be Afraid Not to Try",
    "Small Steps Every Day Lead to Big Results",
    "Strive for Progress, Not Perfection",
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
      timeout: 30000,
    });

    await page.waitForTimeout(3000);

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
