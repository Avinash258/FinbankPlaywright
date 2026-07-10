import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: /^accounts$/i, level: 1 });
  }

  get combinedBalance(): Locator {
    return this.page.getByText('Combined Balance');
  }

  get primaryCheckingAccount(): Locator {
    return this.page.getByText('Primary Checking').first();
  }

  get highYieldSavingsAccount(): Locator {
    return this.page.getByText('High-Yield Savings').first();
  }

  get investmentAccount(): Locator {
    return this.page.getByText('Investment Account').first();
  }

  async expectLoaded(): Promise<void> {
    await this.heading.waitFor({ state: 'visible' });
    await this.combinedBalance.waitFor({ state: 'visible' });
  }
}
