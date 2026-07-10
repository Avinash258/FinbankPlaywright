import { expect, test } from '../../../fixtures/ui.fixture';

test.describe('Transactions', () => {
  test.beforeEach(async ({ authenticatedPage, sidebar }) => {
    void authenticatedPage;
    await sidebar.goTo('Transactions');
  });

  test('displays transaction history page', async ({ transactionsPage }) => {
    await transactionsPage.expectLoaded();
    await expect(transactionsPage.page.getByText('View and search your transaction history')).toBeVisible();
  });

  test('shows spending summary and filter controls', async ({ transactionsPage }) => {
    await expect(transactionsPage.totalSpentLabel).toBeVisible();
    await expect(transactionsPage.filterButton).toBeVisible();
  });

  test('lists completed transactions', async ({ transactionsPage }) => {
    await expect(transactionsPage.page.getByText('completed').first()).toBeVisible();
  });
});
