import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class NotificationsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get sidebarLink(): Locator {
    return this.page.getByRole('link', { name: 'Notifications', exact: true });
  }

  async expectLoaded(): Promise<void> {
    await this.page.waitForURL('**/notifications');
    await this.sidebarLink.waitFor({ state: 'visible' });
  }
}
