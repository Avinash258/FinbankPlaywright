import { type Locator, type Page } from '@playwright/test';
import { type NavItem } from '../utils/constants';

export class SidebarNavigation {
  constructor(private readonly page: Page) {}

  navLink(name: NavItem): Locator {
    return this.page.getByRole('link', { name, exact: true });
  }

  async goTo(name: NavItem): Promise<void> {
    await this.navLink(name).click();
  }
}
