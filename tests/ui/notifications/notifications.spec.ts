import { expect, test } from '../../../fixtures/ui.fixture';

test.describe('Notifications', () => {
  test.beforeEach(async ({ authenticatedPage, sidebar }) => {
    void authenticatedPage;
    await sidebar.goTo('Notifications');
  });

  test('navigates to notifications route', async ({ notificationsPage, page }) => {
    await notificationsPage.expectLoaded();
    await expect(page).toHaveURL(/\/notifications/);
  });
});
