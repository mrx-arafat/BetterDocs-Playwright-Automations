import { test, expect } from "@playwright/test";

test.use({ storageState: "bd-free.json" });

test.setTimeout(120000);

test("Create multiple docs in BetterDocs with predefined titles", async ({
  page,
}) => {
  await page.goto(
    "http://bd-explore-free.local/wp-admin/post-new.php?post_type=docs"
  );
  console.log("Navigated directly to the 'Add New Doc' page");

  const titles = [
    "1 Navigating the Cosmos: A Beginner's Guide",
    "2 Enhancing Interstellar Travel: Performance Optimization",
    "3 Strategies for Cosmic Exploration: Tips and Tricks",
    "4 AI Governance: Best Practices for User Management",
    "5 Mastering Advanced Technologies: Plugin Configurations for the Future",
    "6 Galactic Security Protocols: Essential Practices",
    "7 Quantum Computing: A Guide for New Explorers",
    "8 Terraforming Planets: Strategies for Success",
    "9 Cybernetic Enhancements: Maximizing Human Potential",
    "10 Intergalactic Diplomacy: Best Practices for Engaging Alien Cultures",
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
            "http://bd-explore-free.local/wp-admin/post-new.php?post_type=docs"
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
