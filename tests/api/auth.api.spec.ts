import { expect, test } from '../../fixtures/api.fixture';
import { getTestData } from '../../utils/load-test-data';

const testData = getTestData();

test.describe('Auth API', () => {
  test('POST /api/auth/login returns token and user profile', async ({ apiClient }) => {
    const response = await apiClient.login();

    expect(response.token).toBeTruthy();
    expect(response.user.email).toBe(testData.users.valid.email);
    expect(response.user.firstName).toBe(testData.users.valid.firstName);
    expect(response.user.lastName).toBe(testData.users.valid.lastName);
    expect(response.user.kycStatus).toBe(testData.users.valid.kycStatus);
  });

  test('POST /api/auth/login rejects invalid credentials', async ({ request }) => {
    const response = await request.post(testData.api.endpoints.login, {
      data: testData.users.invalid,
    });

    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test('GET /api/auth/me returns authenticated user', async ({ apiClient }) => {
    await apiClient.login();
    const user = await apiClient.getCurrentUser();

    expect(user.email).toBe(testData.users.valid.email);
    expect(user.id).toBeTruthy();
  });

  test('GET /api/auth/me rejects unauthenticated requests', async ({ request }) => {
    const response = await request.get(testData.api.endpoints.me);
    expect(response.status()).toBeGreaterThanOrEqual(401);
  });
});
