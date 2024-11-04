import { test, expect } from "@playwright/test";

test("Login and save storage state", async ({ page }) => {
  // Navigate to login page and perform login
  await page.goto(
    "http://bd-explore-free.local/wp-login.php?redirect_to=http%3A%2F%2Fbd-explore-free.local%3A10078%2Fwp-admin%2F&reauth=1"
  );
  await page.getByLabel("Username or Email Address").fill("arafat");
  await page.getByLabel("Password", { exact: true }).fill("arafat");
  await page.getByRole("button", { name: "Log In" }).click();

  // Save the storage state (cookies, localStorage, etc.) to a file
  await page.context().storageState({ path: "bd-free.json" });
});
