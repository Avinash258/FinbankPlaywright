import { expect, test } from '../../../fixtures/ui.fixture';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    void authenticatedPage;
  });

  test('displays financial overview widgets', async ({ dashboardPage }) => {
    await expect(dashboardPage.heading).toBeVisible();
    await expect(dashboardPage.totalBalanceCard).toBeVisible();
    await expect(dashboardPage.portfolioCard).toBeVisible();
    await expect(dashboardPage.recentTransactionsSection).toBeVisible();
    await expect(dashboardPage.assetAllocationSection).toBeVisible();
  });

  test('shows user profile in sidebar', async ({ dashboardPage }) => {
    await expect(dashboardPage.page.getByText('Alex Morgan')).toBeVisible();
    await expect(dashboardPage.userEmail).toBeVisible();
  });

  test('total balance displays a currency value', async ({ dashboardPage }) => {
    await expect(dashboardPage.page.getByText(/\$[\d,]+\.\d{2}/).first()).toBeVisible();
  });
});
