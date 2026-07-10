import { test as base } from '@playwright/test';
import { SidebarNavigation } from '../components/SidebarNavigation';
import { AccountsPage } from '../pages/AccountsPage';
import { CardsPage } from '../pages/CardsPage';
import { DashboardPage } from '../pages/DashboardPage';
import { InvestmentsPage } from '../pages/InvestmentsPage';
import { LoginPage } from '../pages/LoginPage';
import { NotificationsPage } from '../pages/NotificationsPage';
import { ProfilePage } from '../pages/ProfilePage';
import { TransactionsPage } from '../pages/TransactionsPage';
import { TransferPage } from '../pages/TransferPage';
import { credentials } from '../utils/load-test-data';

type UiFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  accountsPage: AccountsPage;
  transactionsPage: TransactionsPage;
  transferPage: TransferPage;
  investmentsPage: InvestmentsPage;
  cardsPage: CardsPage;
  notificationsPage: NotificationsPage;
  profilePage: ProfilePage;
  sidebar: SidebarNavigation;
  authenticatedPage: void;
};

export const test = base.extend<UiFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  accountsPage: async ({ page }, use) => {
    await use(new AccountsPage(page));
  },

  transactionsPage: async ({ page }, use) => {
    await use(new TransactionsPage(page));
  },

  transferPage: async ({ page }, use) => {
    await use(new TransferPage(page));
  },

  investmentsPage: async ({ page }, use) => {
    await use(new InvestmentsPage(page));
  },

  cardsPage: async ({ page }, use) => {
    await use(new CardsPage(page));
  },

  notificationsPage: async ({ page }, use) => {
    await use(new NotificationsPage(page));
  },

  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },

  sidebar: async ({ page }, use) => {
    await use(new SidebarNavigation(page));
  },

  authenticatedPage: async ({ loginPage, dashboardPage }, use) => {
    await loginPage.goto();
    await loginPage.login(credentials.email, credentials.password);
    await dashboardPage.expectLoaded();
    await dashboardPage.expectAuthenticated();
    await use();
  },
});

export { expect } from '@playwright/test';
