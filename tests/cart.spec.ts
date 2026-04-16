import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { validUser } from "../testData/users";
import { URLs } from "../testData/urls";
//import { CheckoutPage } from '../pages/CheckoutPage';

test.describe("Cart Tests", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);
    await expect(page).toHaveURL(URLs.inventory);

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addBackpackToCart();
  });

  test("should add backpack to cart and verify cart count", async ({
    page,
  }) => {
    const inventoryPage = new InventoryPage(page);
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe("1");
  });

  test("should verify cart page", async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await expect(page).toHaveURL(URLs.cart);
    expect(await cartPage.getCartItemCount()).toBe(1);
    expect(await cartPage.getItemName()).toContain("Sauce Labs Backpack");
    expect(await cartPage.getItemPrice()).toContain("$29.99");
    await expect(cartPage.checkoutButton).toBeVisible();
    await expect(cartPage.continueShoppingButton).toBeVisible();
  });

  test("should remove item from cart", async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await cartPage.removeItemFromCart("sauce-labs-backpack");
    expect(await cartPage.getCartItemCount()).toBe(0);
  });

  test("should proceed to checkout", async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(URLs.checkoutStepOne);
  });

  test("should be in cart and continue shopping to inventory page", async ({
    page,
  }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await cartPage.continueShopping();
    await expect(page).toHaveURL(URLs.inventory);
  });

  test("should click on cart item and navigate to inventory item details page", async ({
    page,
  }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await cartPage.clickCartItem("Sauce Labs Backpack");
    await expect(page).toHaveURL(/inventory-item/);
  });
});
