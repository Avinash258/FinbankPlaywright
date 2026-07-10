import { expect, test } from '../../../fixtures/ui.fixture';
import { NAV_ITEMS } from '../../../utils/constants';

test.describe('Sidebar navigation', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    void authenticatedPage;
  });

  for (const item of NAV_ITEMS) {
    test(`navigates to ${item}`, async ({ sidebar, page }) => {
      await sidebar.goTo(item);

      await expect(page.getByRole('link', { name: item, exact: true })).toBeVisible();

      if (item === 'Notifications') {
        await expect(page.getByText('Notifications').first()).toBeVisible();
      } else {
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      }
    });
  }

  test('signs out and returns to login', async ({ dashboardPage, loginPage }) => {
    await dashboardPage.signOutButton.click();

    await expect(loginPage.welcomeHeading).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
  });
});
