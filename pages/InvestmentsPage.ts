import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InvestmentsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: /^investments$/i, level: 1 });
  }

  get portfolioValue(): Locator {
    return this.page.getByText('Portfolio Value');
  }

  get holdingsSection(): Locator {
    return this.page.getByRole('heading', { name: /^holdings$/i });
  }

  get tradeSection(): Locator {
    return this.page.getByRole('heading', { name: /^trade$/i });
  }

  get marketSection(): Locator {
    return this.page.getByRole('heading', { name: /^market$/i });
  }

  get executeTradeButton(): Locator {
    return this.page.getByRole('button', { name: /execute trade/i });
  }

  async expectLoaded(): Promise<void> {
    await this.heading.waitFor({ state: 'visible' });
    await this.holdingsSection.waitFor({ state: 'visible' });
  }
}
