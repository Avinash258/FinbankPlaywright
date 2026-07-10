# Test documentation

Detailed guide for writing and running FinVault Playwright tests.

## Test layers

| Layer | Location | Fixture | Browser |
|-------|----------|---------|---------|
| UI | `tests/ui/` | `fixtures/ui.fixture.ts` | Yes (Chromium) |
| API | `tests/api/` | `fixtures/api.fixture.ts` | No |

Keep UI and API specs in separate folders. Do not mix HTTP assertions into page objects.

## Test data rules

1. **Single source of truth** — `testdata/testdata.json`
2. **No hardcoded credentials** in spec files; use `getTestData()`
3. **Environment overrides** — `DEMO_EMAIL` and `DEMO_PASSWORD` in `.env` for local/CI secrets
4. **Invalid user data** — use `testData.users.invalid` for negative tests

## UI authentication

FinVault stores auth in SPA memory only. Implications:

- Every protected UI test must request the `authenticatedPage` fixture
- `storageState` and API-only login do not work for browser tests
- Navigate via sidebar after login; avoid `page.goto()` to protected routes

```typescript
test.beforeEach(async ({ authenticatedPage, sidebar }) => {
  void authenticatedPage;
  await sidebar.goTo('Accounts');
});
```

## Sharding guide

### When to shard

- CI pipelines with 40+ tests
- Long-running UI suites across multiple agents
- Local parallel validation before release

### How Playwright assigns tests

Playwright distributes tests deterministically by file/test name. The same `--shard=2/4` always runs the same subset.

### Recommended shard count

| Total tests | Suggested shards |
|-------------|------------------|
| < 20        | 1 (no sharding)  |
| 20–50       | 2–4              |
| 50+         | 4–8              |

Current suite: **42 tests** → **4 shards** in CI (~10–11 tests per shard).

### Verify shard distribution

```bash
npx playwright test --shard=1/4 --list
npx playwright test --shard=2/4 --list
npx playwright test --shard=3/4 --list
npx playwright test --shard=4/4 --list
```

### CI blob reports

When `CI=true`, `playwright.config.ts` uses the `blob` reporter. Each shard writes to `blob-report/`. The merge job runs:

```bash
npx playwright merge-reports --reporter html ./blob-report
```

## Naming conventions

| Item | Convention | Example |
|------|------------|---------|
| UI spec files | `<feature>.spec.ts` | `login.spec.ts` |
| API spec files | `<feature>.api.spec.ts` | `auth.api.spec.ts` |
| Page objects | `<Feature>Page.ts` | `LoginPage.ts` |
| Describe blocks | Feature or page name | `Authentication`, `Accounts` |

## Selectors priority

1. `getByRole`
2. `getByLabel`
3. `getByText`
4. `getByTestId` (if added to app)
5. CSS — last resort

Use `.first()` when duplicate elements exist (e.g. repeated account cards).

## Reporting

| Environment | Reporter | Output |
|-------------|----------|--------|
| Local | `html`, `list` | `playwright-report/` |
| CI shard | `blob`, `list`, `github` | `blob-report/` |
| CI merge | `html` | `playwright-report/` |

View local report: `npm run test:report`
