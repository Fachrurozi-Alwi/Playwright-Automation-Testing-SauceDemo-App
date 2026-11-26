import { Page, Locator } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly inventoryList: Locator;
  readonly inventoryItems: Locator;
  readonly shoppingCart: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.locator(".inventory_list");
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.shoppingCart = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async addProductToCart(product: string) {
    await this.page.locator(`[data-test="add-to-cart-${product}"]`).click();
  }

  async removeProductFromCart(product: string) {
    await this.page.locator(`[data-test="remove-${product}"]`).click();
  }

  async openCart() {
    await this.shoppingCart.click();
  }
}
