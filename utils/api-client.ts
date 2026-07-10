import { type APIRequestContext } from '@playwright/test';
import { credentials, getTestData } from './load-test-data';

export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar: string;
  memberSince: string;
  kycStatus: string;
};

export type LoginResponse = {
  token: string;
  user: AuthUser;
};

export class FinVaultApiClient {
  private token?: string;
  private readonly endpoints = getTestData().api.endpoints;

  constructor(private readonly request: APIRequestContext) {}

  async login(
    email = credentials.email,
    password = credentials.password,
  ): Promise<LoginResponse> {
    const response = await this.request.post(this.endpoints.login, {
      data: { email, password },
    });

    if (!response.ok()) {
      throw new Error(`Login failed with status ${response.status()}`);
    }

    const body = (await response.json()) as LoginResponse;
    this.token = body.token;
    return body;
  }

  async getCurrentUser(): Promise<AuthUser> {
    const response = await this.request.get(this.endpoints.me, {
      headers: this.authHeaders(),
    });

    if (!response.ok()) {
      throw new Error(`GET /api/auth/me failed with status ${response.status()}`);
    }

    return response.json() as Promise<AuthUser>;
  }

  async getAccounts(): Promise<unknown> {
    const response = await this.request.get(this.endpoints.accounts, {
      headers: this.authHeaders(),
    });

    if (!response.ok()) {
      throw new Error(`GET /api/accounts/accounts failed with status ${response.status()}`);
    }

    return response.json();
  }

  async getPortfolio(): Promise<unknown> {
    const response = await this.request.get(this.endpoints.portfolio, {
      headers: this.authHeaders(),
    });

    if (!response.ok()) {
      throw new Error(`GET /api/investments/portfolio failed with status ${response.status()}`);
    }

    return response.json();
  }

  getToken(): string | undefined {
    return this.token;
  }

  private authHeaders(): Record<string, string> {
    if (!this.token) {
      throw new Error('Not authenticated — call login() first');
    }

    return { Authorization: `Bearer ${this.token}` };
  }
}
