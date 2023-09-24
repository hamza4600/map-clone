export const SITE_TITLE = 'MAPA';
export const VERSION = process.env.REACT_APP_VERSION;
export const COPYRIGHT = '© Geneva Media Services LLC';

export const PATH = 'mapa';

export const ENVIRONMENTS = {
  dev: {
    hostname: process.env.REACT_APP_DEV_API_HOST,
    url: process.env.REACT_APP_DEV_API_URL,
    key: process.env.REACT_APP_DEV_API_KEY,
    vin: process.env.REACT_APP_DEV_VIN_KEY
  },
  stage: {
    hostname: process.env.REACT_APP_STAGE_API_HOST,
    url: process.env.REACT_APP_STAGE_API_URL,
    key: process.env.REACT_APP_STAGE_API_KEY,
    vin: process.env.REACT_APP_STAGE_VIN_KEY
  },
  prod: {
    hostname: process.env.REACT_APP_PROD_API_HOST,
    url: process.env.REACT_APP_PROD_API_URL,
    key: process.env.REACT_APP_PROD_API_KEY,
    vin: process.env.REACT_APP_PROD_VIN_KEY
  }
}

export const TINY_MCE_API = process.env.REACT_APP_TINY_MCE_API;

export const DEBUG = false;


// UI

export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 1250,
  xl: 1800
}

export const VARIANTS = ['primary', 'secondary', 'success', 'warning', 'danger', 'info']

export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const TIMES = {
  modalDuration:      2, // in seconds
  reauthWarningTime:  2, // in minutes
  sessionTimerLength: 5, // in seconds
  transitionDuration: 150, // in milliseconds
  tooltipDelay:       500  // in milliseconds
}

export const ROWS_ON_PAGE = {
  default: 25,
  options: [ 12, 25, 50, 100 ]
}

export const MODAL_PRIORITY = {
  loading:       -1,
  extendSession:  2,
  logOut:         3
}

export const DELIVERY_METHODS = {
  email: 'E',
  text:  'T'
}

export const USER_ROLES = {
  user: {
    name: 'Application User',
    key:  'APPUSR'
  },
  storeAdmin: {
    name: 'Dealership Store Admin',
    key:  'DADMIN'
  },
  sysAdmin: {
    name: 'Application Admin',
    key:  'APPADM'
  },
  master: {
    name: 'Application Master',
    key:  'APMSTR'
  }
}

export const VEHICLE_ISSUES = [
  {
    label: 'CPO Issues',
    key: 'CPO'
  },
  {
    label: 'Flag Issues',
    key: 'FLG'
  }
]

export const VEHICLE_RANGES = [
  {
    label:  '0-15',
    lookup: '15D'
  },
  {
    label:  '16-30',
    lookup: '30D'
  },
  {
    label:  '31-45',
    lookup: '45D'
  },
  {
    label:  '46-60',
    lookup: '60D'
  },
  {
    label:  '61-75',
    lookup: '75D'
  },
  {
    label:  '76-90',
    lookup: '90D'
  },
  {
    label:  '91-120',
    lookup: '120D'
  },
  {
    label:  '121+',
    lookup: '120DP'
  }
]


export const GOAL_METHODS = {
  price: {
    key: 'P',
    label: 'By Price'
  },
  imvLabel: {
    key: 'I',
    label: 'By IMV Label'
  },
  auto: {
    key: 'A',
    label: 'Auto'
  }
}

export const RANGE_METHOD = {
  amount: {
    key: 'P',
    label: 'By Amount'
  },
  percent: {
    key: 'D',
    label: 'By Percent'
  },
  match: {
    key: 'M',
    label: 'Match'
  },
}

export const RATE_METHOD = {
  monthly: {
    label: 'Monthly',
    key: 'MTH'
  },
  annually: {
    label: 'Annually',
    key: 'ANU'
  },
  auto: {
    label: 'Auto',
    key: 'AUT'
  }
}

export const ADD_DEDUCTS = {
  above: 'A',
  below: 'B'
}

export const DISCOUNT_STRATEGIES = {
  linear: 'LINEAR',
  gradual: 'GRADUL',
  aggressive: 'AGRSIV',
  none: 'NONE00'
}

export const PRICE_POINTS = {
  great: {
    label: 'Great Price',
    key: 'GRP',
    propertyKey: 'great_price'
  },
  good: {
    label: 'Good Price',
    key: 'GDP',
    propertyKey: 'good_price'
  },
  fair: {
    label: 'Fair Price',
    key: 'FRP',
    propertyKey: 'fair_price'
  },
  high: {
    label: 'High Price',
    key: 'HIP',
    propertyKey: 'high_price'
  },
  over: {
    label: 'Over Priced',
    key: 'OVP',
    propertyKey: 'overpriced_price'
  }
}
