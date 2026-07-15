# FinVault Playwright Test Suite

End-to-end and API test automation for [FinVault Digital Banking](https://sole-value-conflict-inflation.trycloudflare.com/) using Playwright and TypeScript.

## Features

- **UI tests** — login, dashboard, accounts, transactions, transfers, investments, cards, profile, and navigation.
- **API tests** — auth, accounts, and investments endpoints
- **Page Object Model** with custom fixtures for maintainable tests
- **JSON test data** — centralized credentials and assertions in `testdata/testdata.json`
- **Parallel execution** with **4-way sharding** in CI for faster feedback
- **Merged HTML reports** from all CI shards

## Prerequisites

- [Node.js](https://nodejs.org/) 20+
- npm 9+

## Quick start

```bash
git clone https://github.com/Avinash258/FinbankPlaywright.git
cd FinbankPlaywright
npm install
npx playwright install chromium
cp .env.example .env
npm test
```

## Configuration

### Environment variables (`.env`)

| Variable        | Description              | Default                                              |
|-----------------|--------------------------|------------------------------------------------------|
| `BASE_URL`      | Application under test   | `https://sole-value-conflict-inflation.trycloudflare.com` |
| `DEMO_EMAIL`    | Valid login email        | `demo@fintech.com`                                   |
| `DEMO_PASSWORD` | Valid login password     | `demo123`                                            |

Copy `.env.example` to `.env` and adjust as needed. Environment values override matching fields in `testdata/testdata.json`.

### Test data (`testdata/testdata.json`)

All shared test inputs live in JSON:

```json
{
  "users": {
    "valid": { "email": "demo@fintech.com", "password": "demo123", ... },
    "invalid": { "email": "bad@example.com", "password": "wrong" }
  },
  "accounts": { "primaryChecking": "Primary Checking", ... },
  "api": { "endpoints": { "login": "/api/auth/login", ... } }
}
```

Load in tests via:

```typescript
import { getTestData } from '../../utils/load-test-data';

const testData = getTestData();
await loginPage.login(testData.users.valid.email, testData.users.valid.password);
```

## Project structure

```
FinBankProject/
├── testdata/
│   └── testdata.json          # Shared test data (JSON)
├── tests/
│   ├── ui/                    # Browser/UI tests
│   │   ├── auth/
│   │   ├── accounts/
│   │   ├── dashboard/
│   │   └── ...
│   └── api/                   # HTTP API tests
│       ├── auth.api.spec.ts
│       ├── accounts.api.spec.ts
│       └── investments.api.spec.ts
├── fixtures/
│   ├── ui.fixture.ts          # Page objects + authenticatedPage
│   └── api.fixture.ts         # apiClient fixture
├── pages/                     # Page Object Model classes
├── components/                # Reusable UI components (e.g. sidebar)
├── utils/
│   ├── load-test-data.ts      # JSON loader with env overrides
│   ├── api-client.ts          # Typed API helper
│   └── constants.ts           # Routes and nav labels
├── types/
│   └── test-data.types.ts     # Shared TypeScript types
├── scripts/
│   └── run-shard.ts           # Cross-platform shard runner (TypeScript)
├── playwright.config.ts
└── .github/workflows/         # CI with 4-way sharding
```

## Running tests

| Command | Description |
|---------|-------------|
| `npm test` | Run all UI + API tests |
| `npm run test:ui` | UI tests only |
| `npm run test:api` | API tests only |
| `npm run test:headed` | Run with visible browser |
| `npm run test:ui-mode` | Playwright interactive UI mode |
| `npm run test:debug` | Step-through debugger |
| `npm run test:report` | Open last HTML report |
| `npm run typecheck` | Run TypeScript compiler checks |

## Sharding

Sharding splits the test suite across multiple machines or processes. Each shard runs a subset of tests; reports are merged afterward.

### Local sharding

Run a specific shard (1-based index):

```bash
# Shard 1 of 4
npm run test:shard -- 1 4

# Shard 2 of 4 — UI tests only
npm run test:shard -- 2 4 -- --project=ui

# Direct Playwright CLI
npx playwright test --shard=3/4
```

List tests assigned to a shard without running:

```bash
npx playwright test --shard=1/4 --list
```

### CI sharding

GitHub Actions runs **4 parallel shards** on every push/PR to `main`. Each shard uploads a blob report; a `merge-reports` job combines them into a single HTML report artifact.

To change shard count, update the matrix in `.github/workflows/playwright.yml`:

```yaml
matrix:
  shard: [1, 2, 3, 4]   # increase/decrease shard count here
```

And keep the run command in sync: `--shard=${{ matrix.shard }}/4`.

### Merge reports locally

After running shards with `CI=true` (blob reporter):

```bash
npm run test:merge-report
```

## Architecture

### UI tests

- **Page Object Model** — locators and actions live in `pages/`; assertions stay in spec files
- **`authenticatedPage` fixture** — logs in via UI before each protected test (auth is in-memory SPA state; no cookies/localStorage)
- **Role-based locators** — prefer `getByRole`, `getByLabel`, `getByText` over CSS selectors
- **Client-side navigation** — after login, use sidebar links; direct `page.goto('/accounts')` triggers a full reload and loses session

### API tests

- **`FinVaultApiClient`** — JWT login and authenticated GET helpers
- Endpoints configured in `testdata/testdata.json` under `api.endpoints`

### Adding a new UI test

1. Add data to `testdata/testdata.json` if needed
2. Create or extend a page object in `pages/`
3. Add spec under `tests/ui/<feature>/`
4. Import from `fixtures/ui.fixture.ts`:

```typescript
import { expect, test } from '../../../fixtures/ui.fixture';
import { getTestData } from '../../../utils/load-test-data';

test.beforeEach(async ({ authenticatedPage }) => {
  void authenticatedPage;
});

test('my scenario', async ({ dashboardPage }) => {
  await expect(dashboardPage.heading).toBeVisible();
});
```

### Adding a new API test

1. Add endpoint to `testdata/testdata.json` → `api.endpoints`
2. Add method to `utils/api-client.ts`
3. Add spec under `tests/api/` using `fixtures/api.fixture.ts`

## CI/CD

Workflow: `.github/workflows/playwright.yml`

1. **test** — 4 parallel jobs, each running one shard with Chromium
2. **merge-reports** — combines blob reports into downloadable HTML artifact

Artifacts are retained for 14 days.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Browser not installed | `npx playwright install chromium` |
| Login redirect loop | Use sidebar navigation after login, not direct URL reload |
| Shard runs 0 tests | Check shard index/total; run `--list` to inspect distribution |
| `.env` not loaded | Ensure file exists at project root; vars override JSON defaults |


