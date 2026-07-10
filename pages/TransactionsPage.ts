import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TransactionsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: /^transactions$/i, level: 1 });
  }

  get spendingByCategory(): Locator {
    return this.page.getByRole('heading', { name: /spending by category/i });
  }

  get filterButton(): Locator {
    return this.page.getByRole('button', { name: /filter/i });
  }

  get totalSpentLabel(): Locator {
    return this.page.getByText('Total Spent');
  }

  async expectLoaded(): Promise<void> {
    await this.heading.waitFor({ state: 'visible' });
    await this.spendingByCategory.waitFor({ state: 'visible' });
  }
}
