import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { validUser } from '../testData/users';
import { URLs } from '../testData/urls';
import { SortOptions } from '../testData/sortOptions';

test.describe('Sorting Tests', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(validUser.username, validUser.password);
        await expect(page).toHaveURL(URLs.inventory);
    });

    test('should sort products by price low to high and verify sorting', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.sortBy(SortOptions.priceLowHigh);
        const prices = await inventoryPage.getProductPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    });

    test('should sort products by price high to low and verify sorting', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.sortBy(SortOptions.priceHighLow);
        const prices = await inventoryPage.getProductPrices();
        const sortedPrices = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sortedPrices);
    });

    test('should sort products by name A to Z and verify sorting', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.sortBy(SortOptions.nameAZ);
        const names = await inventoryPage.getProductNames();
        const sortedNames = [...names].sort();
        expect(names).toEqual(sortedNames);
    });

    test('should sort products by name Z to A and verify sorting', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.sortBy(SortOptions.nameZA);
        const names = await inventoryPage.getProductNames();
        const sortedNames = [...names].sort().reverse();
        expect(names).toEqual(sortedNames);
    }); 

});