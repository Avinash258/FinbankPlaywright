import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TransferPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: /transfer & pay/i, level: 1 });
  }

  get transferTab(): Locator {
    return this.page.getByRole('button', { name: /^transfer$/i });
  }

  get payBillTab(): Locator {
    return this.page.getByRole('button', { name: /pay bill/i });
  }

  get fromAccountLabel(): Locator {
    return this.page.getByText('From Account');
  }

  async expectLoaded(): Promise<void> {
    await this.heading.waitFor({ state: 'visible' });
    await this.fromAccountLabel.waitFor({ state: 'visible' });
  }
}
