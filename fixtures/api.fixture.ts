import { test as base } from '@playwright/test';
import { FinVaultApiClient } from '../utils/api-client';

type ApiFixtures = {
  apiClient: FinVaultApiClient;
};

export const test = base.extend<ApiFixtures>({
  apiClient: async ({ request }, use) => {
    await use(new FinVaultApiClient(request));
  },
});

export { expect } from '@playwright/test';
