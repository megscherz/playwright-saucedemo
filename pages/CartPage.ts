import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly shoppingCart: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;
  readonly itemName: Locator;
  readonly itemPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]',
    );
    this.shoppingCart = page.locator('[data-test="shopping-cart-container"]');
    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]',
    );
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItems = page.locator(".cart_item");
    this.itemName = page.locator(".inventory_item_name");
    this.itemPrice = page.locator(".inventory_item_price");
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/cart.html");
  }

  async getCartItems() {
    return this.page.locator(".cart_item").count();
  }

  async clickCartItem(itemName: string) {
    await this.page
      .locator(`.inventory_item_name:has-text("${itemName}")`)
      .click();
  }

  getRemoveButton(itemName: string): Locator {
    return this.page.locator(`[data-test="remove-${itemName}"]`);
  }

  async removeItemFromCart(itemName: string) {
    await this.getRemoveButton(itemName).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async getCartItemCount() {
    return this.cartItems.count();
  }

  async getItemName() {
    return this.itemName.textContent();
  }

  async getItemPrice() {
    return this.itemPrice.textContent();
  }
}
