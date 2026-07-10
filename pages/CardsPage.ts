import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CardsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: /^cards$/i, level: 1 });
  }

  get rewardsCreditCard(): Locator {
    return this.page.getByText('Rewards Credit').first();
  }

  get freezeCardButtons(): Locator {
    return this.page.getByRole('button', { name: /freeze card/i });
  }

  async expectLoaded(): Promise<void> {
    await this.heading.waitFor({ state: 'visible' });
    await this.rewardsCreditCard.waitFor({ state: 'visible' });
  }
}
