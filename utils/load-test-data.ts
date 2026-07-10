import testDataJson from '../testdata/testdata.json';

export type TestData = typeof testDataJson;

const testData: TestData = structuredClone(testDataJson);

if (process.env.DEMO_EMAIL) {
  testData.users.valid.email = process.env.DEMO_EMAIL;
}

if (process.env.DEMO_PASSWORD) {
  testData.users.valid.password = process.env.DEMO_PASSWORD;
}

export function getTestData(): TestData {
  return testData;
}

export const credentials = {
  get email() {
    return testData.users.valid.email;
  },
  get password() {
    return testData.users.valid.password;
  },
};

export function getDemoUser() {
  return testData.users.valid;
}
