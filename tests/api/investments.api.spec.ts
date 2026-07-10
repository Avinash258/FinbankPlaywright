import { expect, test } from '../../fixtures/api.fixture';

test.describe('Investments API', () => {
  test('GET /api/investments/portfolio returns portfolio data', async ({ apiClient }) => {
    await apiClient.login();
    const portfolio = await apiClient.getPortfolio();

    expect(portfolio).toBeTruthy();
  });
});
