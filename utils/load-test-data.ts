import testDataJson from '../testdata/testdata.json';
import type { TestData } from '../types/test-data.types';

const testData: TestData = structuredClone(testDataJson as TestData);

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
  get email(): string {
    return testData.users.valid.email;
  },
  get password(): string {
    return testData.users.valid.password;
  },
};

export function getDemoUser(): TestData['users']['valid'] {
  return testData.users.valid;
}

export type { TestData } from '../types/test-data.types';
