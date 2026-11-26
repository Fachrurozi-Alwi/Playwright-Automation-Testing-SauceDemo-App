import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
const users = require("../test-data/users.json");

test.describe("Shopping Cart Test Suite", () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);

    // Login
    await loginPage.navigate();

    await loginPage.login(users.validUser.username, users.validUser.password);

    // Add product to cart
    await productsPage.addProductToCart("sauce-labs-backpack");

    // Open shopping cart
    await productsPage.openCart();
  });

  test("TC-CART-001 - Verify shopping cart page visibility", async ({
    page,
  }) => {
    await expect(page).toHaveURL(/cart.html/);

    await expect(cartPage.checkoutButton).toBeVisible();
  });

  test("TC-CART-002 - Verify product in shopping cart", async () => {
    await expect(cartPage.cartItems).toHaveCount(1);

    await expect(
      cartPage.cartItems.locator('[data-test="inventory-item-name"]'),
    ).toHaveText("Sauce Labs Backpack");
  });

  test("TC-CART-003 - Remove product from shopping cart", async () => {
    await cartPage.removeProduct("sauce-labs-backpack");

    await expect(cartPage.cartItems).toHaveCount(0);
  });

  test("TC-CART-004 - Continue shopping from cart", async ({ page }) => {
    await cartPage.continueShopping();

    await expect(page).toHaveURL(/inventory.html/);
  });
});
