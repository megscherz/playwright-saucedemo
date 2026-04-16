import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { invalidUser, lockedOutUser, missingPassword, missingUsername, problemUser, validUser } from '../testData/users';
import { URLs } from '../testData/urls';
import { messages } from "../testData/login";

test.describe("Login Tests", () => {
  test("should login successfully with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(validUser.username, validUser.password);
  await expect(page).toHaveURL(URLs.inventory);
});

  test("locked out user should see error message", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(lockedOutUser.username, lockedOutUser.password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(messages.userLockedOut);
  });

  test("should show error message for invalid credentials", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(invalidUser.username, invalidUser.password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(messages.usernameAndPasswordMismatch
    );
  });

  test("should show error when username is missing", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(missingUsername.username, missingUsername.password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(messages.usernameRequired);
  });

  test("should show error when password is missing", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(missingPassword.username, missingPassword.password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(messages.passwordRequired);
  });

  test("problem user should still login successfully", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(problemUser.username, problemUser.password);
    await expect(page).toHaveURL(URLs.inventory);
  });
});
