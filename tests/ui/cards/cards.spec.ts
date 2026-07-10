import { expect, test } from '../../../fixtures/ui.fixture';
import { getTestData } from '../../../utils/load-test-data';

const testData = getTestData();

test.describe('Cards', () => {
  test.beforeEach(async ({ authenticatedPage, sidebar }) => {
    void authenticatedPage;
    await sidebar.goTo('Cards');
  });

  test('displays cards management page', async ({ cardsPage }) => {
    await cardsPage.expectLoaded();
    await expect(cardsPage.page.getByText('Manage your debit, credit, and virtual cards')).toBeVisible();
    await expect(cardsPage.page.getByText(testData.cards.rewardsCredit).first()).toBeVisible();
  });

  test('shows credit card with masked number', async ({ cardsPage }) => {
    await expect(cardsPage.page.getByText(/•••• •••• •••• \d{4}/).first()).toBeVisible();
    await expect(cardsPage.page.getByText('Credit Limit')).toBeVisible();
  });

  test('provides freeze card actions', async ({ cardsPage }) => {
    await expect(cardsPage.freezeCardButtons.first()).toBeEnabled();
  });
});
