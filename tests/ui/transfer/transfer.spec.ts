import { expect, test } from '../../../fixtures/ui.fixture';
import { getTestData } from '../../../utils/load-test-data';

const testData = getTestData();

test.describe('Transfer & Pay', () => {
  test.beforeEach(async ({ authenticatedPage, sidebar }) => {
    void authenticatedPage;
    await sidebar.goTo('Transfer & Pay');
  });

  test('displays transfer form', async ({ transferPage }) => {
    await transferPage.expectLoaded();
    await expect(transferPage.page.getByText('Move money between accounts or pay bills')).toBeVisible();
  });

  test('shows transfer and pay bill tabs', async ({ transferPage }) => {
    await expect(transferPage.transferTab).toBeVisible();
    await expect(transferPage.payBillTab).toBeVisible();
  });

  test('lists source accounts in from-account selector', async ({ transferPage }) => {
    const fromAccount = transferPage.page.getByRole('combobox').first();
    await expect(fromAccount).toBeVisible();
    await expect(fromAccount.locator('option').first()).toContainText(testData.accounts.primaryChecking);
  });
});
