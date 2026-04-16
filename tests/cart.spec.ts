import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { validUser } from '../testData/users';
//import { CheckoutPage } from '../pages/CheckoutPage';   

test.describe('Cart Tests', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(validUser.username, validUser.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

        const inventoryPage = new InventoryPage(page);
        await inventoryPage.addBackpackToCart();
    });

    test('should add backpack to cart and verify cart count', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const cartCount = await inventoryPage.getCartCount();
        expect(cartCount).toBe('1');
    });

    test('should verify cart page', async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.goto();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        await expect(cartPage.page.locator('.cart_item')).toHaveCount(1);
        await expect(cartPage.page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
        await expect(cartPage.page.locator('.inventory_item_price')).toHaveText('$29.99');
        await expect(cartPage.checkoutButton).toBeVisible();
        await expect(cartPage.continueShoppingButton).toBeVisible();
        await expect(cartPage.getRemoveButton('sauce-labs-backpack')).toBeVisible();
    });

    test('should remove item from cart', async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.goto();
        await cartPage.removeItemFromCart('sauce-labs-backpack');
        await expect(cartPage.page.locator('.cart_item')).toHaveCount(0);
    });

    test('should proceed to checkout', async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.goto();
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    });

    test('should be in cart and continue shopping to inventory page', async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.goto();
        await cartPage.continueShopping();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('should click on cart item and navigate to inventory item details page', async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.goto();
        await cartPage.clickCartItem('Sauce Labs Backpack');
        await expect(page).toHaveURL(/inventory-item/);
    });

});