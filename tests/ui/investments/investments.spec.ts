import { expect, test } from '../../../fixtures/ui.fixture';
import { getTestData } from '../../../utils/load-test-data';

const testData = getTestData();

test.describe('Investments', () => {
  test.beforeEach(async ({ authenticatedPage, sidebar }) => {
    void authenticatedPage;
    await sidebar.goTo('Investments');
  });

  test('displays portfolio overview', async ({ investmentsPage }) => {
    await investmentsPage.expectLoaded();
    await expect(investmentsPage.portfolioValue).toBeVisible();
    await expect(investmentsPage.page.getByText('Total Gain')).toBeVisible();
  });

  test('shows holdings table with stock symbols', async ({ investmentsPage }) => {
    for (const symbol of testData.investments.symbols) {
      await expect(investmentsPage.page.getByText(symbol).first()).toBeVisible();
    }
  });

  test('shows trade and market sections', async ({ investmentsPage }) => {
    await expect(investmentsPage.tradeSection).toBeVisible();
    await expect(investmentsPage.marketSection).toBeVisible();
    await expect(investmentsPage.executeTradeButton).toBeVisible();
  });
});
