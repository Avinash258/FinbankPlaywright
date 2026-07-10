import { expect, test } from '../../../fixtures/ui.fixture';
import { getTestData } from '../../../utils/load-test-data';

const testData = getTestData();

test.describe('Profile', () => {
  test.beforeEach(async ({ authenticatedPage, sidebar }) => {
    void authenticatedPage;
    await sidebar.goTo('Profile');
  });

  test('displays user profile page', async ({ profilePage }) => {
    const { fullName, email } = testData.users.valid;

    await profilePage.expectLoaded();
    await expect(profilePage.page.getByRole('heading', { name: fullName })).toBeVisible();
    await expect(profilePage.page.getByText(email).first()).toBeVisible();
  });

  test('shows account verification status', async ({ profilePage }) => {
    await expect(profilePage.page.getByText(new RegExp(testData.users.valid.kycStatus, 'i'))).toBeVisible();
  });
});
