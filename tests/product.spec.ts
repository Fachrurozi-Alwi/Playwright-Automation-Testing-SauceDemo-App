import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
const users = require("../test-data/users.json");

test.describe("Products Test Suite", () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);

    await loginPage.navigate();

    await loginPage.login(users.validUser.username, users.validUser.password);

    await expect(page).toHaveURL(/inventory.html/);
  });

  test("TC-PRODUCT-001 - Verify product page visibility", async ({ page }) => {
    await expect(productsPage.inventoryList).toBeVisible();

    await expect(page).toHaveURL(/inventory.html/);
  });

  test("TC-PRODUCT-002 - Verify product list count", async () => {
    await expect(productsPage.inventoryItems).toHaveCount(6);
  });

  test("TC-PRODUCT-003 - Verify product information", async ({ page }) => {
    const productName = page
      .locator('[data-test="inventory-item-name"]')
      .first();

    const productPrice = page
      .locator('[data-test="inventory-item-price"]')
      .first();

    await expect(productName).toBeVisible();
    await expect(productPrice).toBeVisible();
  });

  test("TC-PRODUCT-004 - Add product to cart", async () => {
    await productsPage.addProductToCart("sauce-labs-backpack");

    await expect(productsPage.cartBadge).toHaveText("1");
  });

  test("TC-PRODUCT-005 - Add multiple products to cart", async () => {
    await productsPage.addProductToCart("sauce-labs-backpack");

    await productsPage.addProductToCart("sauce-labs-bike-light");

    await expect(productsPage.cartBadge).toHaveText("2");
  });

  test("TC-PRODUCT-006 - Remove product from cart", async () => {
    await productsPage.addProductToCart("sauce-labs-backpack");

    await productsPage.removeProductFromCart("sauce-labs-backpack");

    await expect(productsPage.cartBadge).toHaveCount(0);
  });
});
