import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Sorting Tests', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('should sort products by price low to high and verify sorting', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.sortBy('lohi');
        const prices = await inventoryPage.getProductPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    });

    test('should sort products by price high to low and verify sorting', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.sortBy('hilo');
        const prices = await inventoryPage.getProductPrices();
        const sortedPrices = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sortedPrices);
    });

    test('should sort products by name A to Z and verify sorting', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.sortBy('az');
        const names = await inventoryPage.getProductNames();
        const sortedNames = [...names].sort();
        expect(names).toEqual(sortedNames);
    });

    test('should sort products by name Z to A and verify sorting', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.sortBy('za');
        const names = await inventoryPage.getProductNames();
        const sortedNames = [...names].sort().reverse();
        expect(names).toEqual(sortedNames);
    }); 

});