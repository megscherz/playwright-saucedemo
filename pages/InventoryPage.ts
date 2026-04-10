import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
  }

  async addBackpackToCart() {
    await this.addToCartButton.click();
  }

  async getCartCount() {
    return this.cartBadge.textContent();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames() {
    return this.productNames.allTextContents();
  }

  async getProductPrices() {
    const prices = await this.productPrices.allTextContents();
    return prices.map(p => parseFloat(p.replace('$', '')));
  }
}