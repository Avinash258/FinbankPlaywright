import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/constants';

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: /^dashboard$/i, level: 1 });
  }

  get totalBalanceCard(): Locator {
    return this.page.getByText('Total Balance');
  }

  get portfolioCard(): Locator {
    return this.page.getByText('Portfolio', { exact: true });
  }

  get accountsCard(): Locator {
    return this.page.getByText('Accounts', { exact: true }).first();
  }

  get recentTransactionsSection(): Locator {
    return this.page.getByText('Recent Transactions');
  }

  get assetAllocationSection(): Locator {
    return this.page.getByText('Asset Allocation');
  }

  async goto(): Promise<void> {
    await this.page.goto(ROUTES.dashboard);
  }

  async expectLoaded(): Promise<void> {
    await this.heading.waitFor({ state: 'visible' });
    await this.totalBalanceCard.waitFor({ state: 'visible' });
  }
}
