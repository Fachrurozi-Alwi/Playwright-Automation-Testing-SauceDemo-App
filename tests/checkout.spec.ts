import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

const users = require("../test-data/users.json");

test.describe("Checkout Test Suite", () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Login
    await loginPage.navigate();

    await loginPage.login(users.validUser.username, users.validUser.password);

    // Add product to cart
    await productsPage.addProductToCart("sauce-labs-backpack");

    // Open cart
    await productsPage.openCart();

    // Start checkout
    await cartPage.checkout();
  });

  test("TC-CHECKOUT-001 - Verify checkout information page", async ({
    page,
  }) => {
    await expect(page).toHaveURL(/checkout-step-one.html/);

    await expect(checkoutPage.firstNameInput).toBeVisible();

    await expect(checkoutPage.lastNameInput).toBeVisible();

    await expect(checkoutPage.postalCodeInput).toBeVisible();
  });

  test("TC-CHECKOUT-002 - Checkout with valid information", async ({
    page,
  }) => {
    await checkoutPage.fillCheckoutInformation(
      users.checkoutInformation.firstName,
      users.checkoutInformation.lastName,
      users.checkoutInformation.postalCode,
    );

    await checkoutPage.continueCheckout();

    await expect(page).toHaveURL(/checkout-step-two.html/);
  });

  test("TC-CHECKOUT-003 - Checkout with empty first name", async () => {
    await checkoutPage.fillCheckoutInformation(
      "",
      users.checkoutInformation.lastName,
      users.checkoutInformation.postalCode,
    );

    await checkoutPage.continueCheckout();

    await expect(checkoutPage.errorMessage).toContainText(
      "First Name is required",
    );
  });

  test("TC-CHECKOUT-004 - Checkout with empty postal code", async () => {
    await checkoutPage.fillCheckoutInformation(
      users.checkoutInformation.firstName,
      users.checkoutInformation.lastName,
      "",
    );

    await checkoutPage.continueCheckout();

    await expect(checkoutPage.errorMessage).toContainText(
      "Postal Code is required",
    );
  });
});
