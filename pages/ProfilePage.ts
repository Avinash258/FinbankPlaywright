import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProfilePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: /^profile$/i, level: 1 });
  }

  get memberSinceLabel(): Locator {
    return this.page.getByText(/member since|kyc/i).first();
  }

  async expectLoaded(): Promise<void> {
    await this.heading.waitFor({ state: 'visible' });
  }
}
