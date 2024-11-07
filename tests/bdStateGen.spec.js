import { test, expect } from "@playwright/test";

test("Login and save storage state", async ({ page }) => {
  // Navigate to login page and perform login
  await page.goto("https://betterdocs.arafatbytes.live/wp-login.php");
  await page.getByLabel("Username or Email Address").fill("arafat");
  await page.getByLabel("Password", { exact: true }).fill("arafat");
  await page.getByRole("button", { name: "Log In" }).click();

  // Save the storage state (cookies, localStorage, etc.) to a file
  await page.context().storageState({ path: "betterdocs-arafatbytes.json" });
});
