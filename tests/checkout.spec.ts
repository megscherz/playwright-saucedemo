import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';   

test.describe('Checkout Tests', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

        const inventoryPage = new InventoryPage(page);
        await inventoryPage.addBackpackToCart();
        const cartPage = new CartPage(page);
        await cartPage.goto();
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    });

    test('should fill out checkout information and continue to checkout step two', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.firstNameInput.fill('John');
        await checkoutPage.lastNameInput.fill('Doe');
        await checkoutPage.zipCodeInput.fill('12345');
        await checkoutPage.continueButton.click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    });

    test('should cancel checkout and return to cart page', async ({ page }) => {        
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.cancelButton.click();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    });
    
    test('should complete checkout and verify order completion', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.firstNameInput.fill('John');
        await checkoutPage.lastNameInput.fill('Doe');
        await checkoutPage.zipCodeInput.fill('12345');
        await checkoutPage.continueButton.click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
        await checkoutPage.finishButton.click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
        await expect(checkoutPage.completeOrderHeader).toHaveText('THANK YOU FOR YOUR ORDER');
        await expect(checkoutPage.completeOrderMessage).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    });
    
});