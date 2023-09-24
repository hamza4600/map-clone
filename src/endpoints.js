export const ENDPOINTS = {
  session: {
    getConfiguration: 'application-configuration',
    login: 'auth/login',
    requestCode: 'security-code-request',
    enterCode: 'security-code-authentication',
    chooseStore: 'auth/change-dealership',
    forgotPassword: 'reset-password',
    confirmToken: 'reset-password/token-confirm',
    newPassword: 'reset-password/new-password',
    extendSession: 'extend-session'
  },
  lookup: {
    dealershipStore: 'dealership-store/list',
    discountStrategy: 'discount-strategy/list',
    inventorySummary: 'vehicle/inventory-total-summary',
    purchaseSource: 'vehicle-purchase-source',
    userRole: 'user-role/list'
  },
  // PRICING
  vehicle: {
    list:   'vehicle/inventory',
    get:    'vehicle',
    update: 'vehicle',
    steps: {
      entryQuestions:  'vehicle/entry-question',
      IMVPricing:      'vehicle/imv-pricing',
      pricingOption:   'vehicle/pricing-option',
      pricingStrategy: 'vehicle/pricing-strategy'
    },
    document: {
      upload: 'vehicle/upload-document'
    },
    decodeVIN: 'vin-decoder/decode'
  },
  // ADMIN
  admin: {
    dealerships: 'dealership-store',
    users: 'user'
  },
  // USER
  user: {
    profile: 'user-account-update',
    password: 'auth/change-password'
  },
}
