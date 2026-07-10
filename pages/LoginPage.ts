import { type Locator, type Page } from '@playwright/test';
import { ROUTES } from '../utils/constants';

export class LoginPage {
  constructor(public readonly page: Page) {}

  get emailInput(): Locator {
    return this.page.locator('input[type="email"]');
  }

  get passwordInput(): Locator {
    return this.page.locator('input[type="password"]');
  }

  get signInButton(): Locator {
    return this.page.getByRole('button', { name: /sign in/i });
  }

  get signUpLink(): Locator {
    return this.page.getByRole('button', { name: /sign up/i });
  }

  get welcomeHeading(): Locator {
    return this.page.getByRole('heading', { name: /welcome back/i });
  }

  get createAccountHeading(): Locator {
    return this.page.getByRole('heading', { name: /create account/i });
  }

  get firstNameInput(): Locator {
    return this.page.getByRole('textbox').nth(0);
  }

  get lastNameInput(): Locator {
    return this.page.getByRole('textbox').nth(1);
  }

  get signUpEmailInput(): Locator {
    return this.page.getByRole('textbox').nth(2);
  }

  get createAccountButton(): Locator {
    return this.page.getByRole('button', { name: /create account/i });
  }

  async goto(): Promise<void> {
    await this.page.goto(ROUTES.login);
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async openSignUpForm(): Promise<void> {
    await this.signUpLink.click();
    await this.createAccountHeading.waitFor({ state: 'visible' });
  }
}
