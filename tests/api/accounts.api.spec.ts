import { expect, test } from '../../fixtures/api.fixture';

test.describe('Accounts API', () => {
  test('GET /api/accounts/accounts returns account list for authenticated user', async ({ apiClient }) => {
    await apiClient.login();
    const accounts = await apiClient.getAccounts();

    expect(Array.isArray(accounts)).toBe(true);
    expect((accounts as unknown[]).length).toBeGreaterThan(0);
  });
});
