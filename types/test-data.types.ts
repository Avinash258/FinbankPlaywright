export type UserCredentials = {
  email: string;
  password: string;
};

export type ValidUser = UserCredentials & {
  firstName: string;
  lastName: string;
  fullName: string;
  kycStatus: string;
};

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

export type ApiEndpoints = {
  login: string;
  me: string;
  accounts: string;
  portfolio: string;
};

export type TestData = {
  users: {
    valid: ValidUser;
    invalid: UserCredentials;
  };
  accounts: {
    primaryChecking: string;
    highYieldSavings: string;
    investmentAccount: string;
  };
  investments: {
    symbols: string[];
  };
  cards: {
    rewardsCredit: string;
  };
  api: {
    endpoints: ApiEndpoints;
  };
};
