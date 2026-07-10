import { type Locator, type Page } from '@playwright/test';

import { credentials } from '../utils/load-test-data';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  get signOutButton(): Locator {
    return this.page.getByRole('button', { name: /sign out/i });
  }

  get userEmail(): Locator {
    return this.page.getByText(credentials.email);
  }

  async expectAuthenticated(): Promise<void> {
    await this.signOutButton.waitFor({ state: 'visible' });
  }
}
