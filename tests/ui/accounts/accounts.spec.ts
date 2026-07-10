import { expect, test } from '../../../fixtures/ui.fixture';

test.describe('Accounts', () => {
  test.beforeEach(async ({ authenticatedPage, sidebar }) => {
    void authenticatedPage;
    await sidebar.goTo('Accounts');
  });

  test('displays account management page', async ({ accountsPage }) => {
    await accountsPage.expectLoaded();
    await expect(accountsPage.page.getByText('Manage your bank accounts')).toBeVisible();
  });

  test('lists primary account types', async ({ accountsPage }) => {
    await expect(accountsPage.primaryCheckingAccount).toBeVisible();
    await expect(accountsPage.highYieldSavingsAccount).toBeVisible();
    await expect(accountsPage.investmentAccount).toBeVisible();
  });

  test('shows masked account numbers', async ({ accountsPage }) => {
    await expect(accountsPage.page.getByText(/\*\*\*\*\d{4}/).first()).toBeVisible();
  });

  test('shows account status badges', async ({ accountsPage }) => {
    await expect(accountsPage.page.getByText('ACTIVE').first()).toBeVisible();
  });
});
