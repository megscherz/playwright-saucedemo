import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';   
import { validUser } from '../testData/users';
import { checkoutInfo, confirmationMessages } from '../testData/checkout';
import { URLs } from '../testData/urls';

test.describe('Checkout Tests', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(validUser.username, validUser.password);
        await expect(page).toHaveURL(URLs.inventory);

        const inventoryPage = new InventoryPage(page);
        await inventoryPage.addBackpackToCart();
        const cartPage = new CartPage(page);
        await cartPage.goto();
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL(URLs.checkoutStepOne);
    });

    test('should fill out checkout information and continue to checkout step two', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillCheckoutInfo(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.zipCode);
        await expect(page).toHaveURL(URLs.checkoutStepTwo);
    });

    test('should cancel checkout and return to cart page', async ({ page }) => {        
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.cancelCheckout();
        await expect(page).toHaveURL(URLs.cart);
    });
    
    test('should complete checkout and verify order completion', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillCheckoutInfo(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.zipCode);
        await checkoutPage.completeOrder();
        await expect(page).toHaveURL(URLs.checkoutComplete);
        const confirmation = await checkoutPage.orderConfirmation();
        expect(confirmation.header).toContain(confirmationMessages.header);
        expect(confirmation.message).toContain(confirmationMessages.message);
    });

});