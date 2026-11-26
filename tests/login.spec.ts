import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
const users = require("../test-data/users.json");

test.describe("Login Test Suite", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test("TC-LOGIN-001 - Login with valid credentials", async ({ page }) => {
    await loginPage.login(users.validUser.username, users.validUser.password);

    await expect(page).toHaveURL(/inventory.html/);
  });

  test("TC-LOGIN-002 - Login with invalid username", async () => {
    await loginPage.login(
      users.InvalidUsername.username,
      users.InvalidUsername.password,
    );

    await expect(loginPage.errorMessage).toContainText(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });

  test("TC-LOGIN-003 - Login with invalid password", async () => {
    await loginPage.login(
      users.InvalidPassword.username,
      users.InvalidPassword.password,
    );

    await expect(loginPage.errorMessage).toContainText(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });

  test("TC-LOGIN-004 - Login with invalid Account", async () => {
    await loginPage.login(
      users.InvalidAccount.username,
      users.InvalidAccount.password,
    );

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test("TC-LOGIN-005 - Login with locked out user", async () => {
    await loginPage.login(users.lockedUser.username, users.lockedUser.password);

    await expect(loginPage.errorMessage).toContainText("locked out");
  });
});
