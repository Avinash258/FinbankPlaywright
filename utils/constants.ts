export const ROUTES = {
  login: '/login',
  dashboard: '/',
  accounts: '/accounts',
  transactions: '/transactions',
  transfer: '/transfer',
  investments: '/investments',
  cards: '/cards',
  notifications: '/notifications',
  profile: '/profile',
} as const;

export const NAV_ITEMS = [
  'Dashboard',
  'Accounts',
  'Transactions',
  'Transfer & Pay',
  'Investments',
  'Cards',
  'Notifications',
  'Profile',
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
