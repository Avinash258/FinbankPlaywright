import { expect, test } from '../../../fixtures/ui.fixture';
import { getTestData } from '../../../utils/load-test-data';

const testData = getTestData();

test.describe('Authentication', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('displays login page with demo credentials hint', async ({ loginPage }) => {
    await expect(loginPage.welcomeHeading).toBeVisible();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.signInButton).toBeEnabled();
    await expect(loginPage.page.getByText(testData.users.valid.email)).toBeVisible();
  });

  test('logs in with valid demo credentials', async ({ loginPage, dashboardPage }) => {
    const { email, password, fullName } = testData.users.valid;
    await loginPage.login(email, password);

    await expect(dashboardPage.heading).toBeVisible();
    await expect(dashboardPage.signOutButton).toBeVisible();
    await expect(dashboardPage.page.getByText(fullName)).toBeVisible();
  });

  test('shows error for invalid credentials', async ({ loginPage }) => {
    const { email, password } = testData.users.invalid;
    await loginPage.login(email, password);

    await expect(loginPage.page.getByText(/invalid|incorrect|failed|error/i)).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
  });

  test('switches to sign-up form', async ({ loginPage }) => {
    await loginPage.openSignUpForm();

    await expect(loginPage.createAccountHeading).toBeVisible();
    await expect(loginPage.page.getByText('Sign up to get started')).toBeVisible();
    await expect(loginPage.page.getByRole('textbox')).toHaveCount(5);
    await expect(loginPage.createAccountButton).toBeEnabled();
  });

  test('redirects unauthenticated users to login on protected routes', async ({ page }) => {
    await page.goto('/accounts');

    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible();
  });
});
