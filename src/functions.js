// DEPENDENCIES
import _ from 'lodash';
import queryString from 'query-string';

// REDUX
import { store } from 'store.js';
import { alertActions, modalActions, sessionActions } from 'actions.js';

// GLOBAL VARIABLES
import { FETCH, DATE, LOGOUT } from 'defaults.js';
import { ENDPOINTS } from 'endpoints.js';
import { DEBUG, ENVIRONMENTS, MODAL_PRIORITY, PATH } from 'globals.js';
import { PATHNAMES } from 'pathnames.js';


// Utility

export const bugLog = (feedback, debug = DEBUG, name, value) => {
  if (name) feedback = `[${name}] ${feedback}`;
  if (value !== undefined) feedback = `${feedback}: ${value}`;
  if (feedback && debug) console.log(feedback);
}

export const doCallback = (callback, val, ...rest) => {
  if (callback === undefined) return val;
  if (_.isFunction(callback)) return callback(val, ...rest);
}

export const randomID = () => Math.random().toString(36).substring(2, 15).toUpperCase();

export const controlName = (name, ...parents) => [...parents, name].filter(p => !!p).join('.').toLowerCase()

export const arrayToCSV = (array, separator = ',') => array.filter(el => el !== '').join(separator);


// API

export const getEnv = key => {
  let val = ENVIRONMENTS.dev[key];
  Object.keys(ENVIRONMENTS).forEach(env => {
    if (window.location.hostname === ENVIRONMENTS[env].hostname) val = ENVIRONMENTS[env][key];
  })
  return val;
}

export const getURL = () => `${getEnv('url')}`;

export const getKey = () => getEnv('key');

export const getEndpoint = (endpoint, prop) => typeof endpoint === 'function' ? !prop ? undefined : endpoint(prop) : endpoint;

export const stringifyBody = (values, stringify, blacklist = []) => {
  if (Array.isArray(values)) {
    return FETCH.useCSV ? values.join(',') : values;
  } else if (typeof values === 'object') {
    _.keys(values).forEach(key => {
      if (blacklist.includes(key)) delete values[key];
      else values[key] = stringifyBody(values[key]);
    })
    return stringify ? JSON.stringify(values) : values;
  } else {
    return values;
  }
}

export const apiFetch = ({
  method = 'GET',
  path = PATH,
  endpoint,
  url = 'https:/' + makePath(getURL(), path, endpoint),
  headers = {},
  body,
  params,
  queryParams = method === 'GET' ? params : undefined,
  bodyParams = method !== 'GET' ? params : undefined,
  onFetch,
  onResponse,
  onSuccess,
  onError,
  loadingMessage,
  successMessage,
  errorMessage,
  messageFunctions = modalFunctions,
  debugOnly,
  debug = debugOnly,
}) => {

  let fetchLog = feedback => bugLog(feedback, debug);

  if (!endpoint) {
    doCallback(onError);
    return console.error('No endpoint specified!');
  }

  const { token } = store.getState();

  let config = {};
  config.method = method;
  config.headers = Object.assign({
    'Content-Type': 'application/json',
    'x-api-key': getKey()
  }, headers);
  if (token) config.headers['Authorization'] = `Bearer ${token}`;

  if (queryParams) url += '?' + queryString.stringify(queryParams);
  if (body) config.body = body;
  if (bodyParams) config.body = stringifyBody(bodyParams, true, FETCH.blacklist);

  if (params) fetchLog(params);

  fetchLog(url);
  fetchLog(config);

  if (debugOnly) return;

  const clearLoadingMessage = loadingMessage ? messageFunctions.loading(loadingMessage) : undefined;
  doCallback(onFetch);

  fetch(url, config)
    .then((response) => {

      fetchLog(response);

      doCallback(clearLoadingMessage);
      doCallback(onResponse, response);

      if (!response.ok) {
        throw Error(response);
      } else {
        return response;
      }
    })
    .then(response => response.json())
    .then((data) => {

      fetchLog(data);

      if (data.status === false) {
        messageFunctions.error(data.ERROR || data.error || data.message || errorMessage);
        doCallback(onError, data);
      } else {
        messageFunctions.success(successMessage);
        doCallback(onSuccess, data);
      }
    })
    .catch((response) => {

      console.error(response);
      console.log(errorMessage);

      messageFunctions.error(errorMessage);
      doCallback(clearLoadingMessage);
      doCallback(onError);
    })
}


// Session

export const timeExpired = timeStamp => timeStamp && new Date(timeStamp).getTime() < _.now();

export const loggedIn = (token, tokenExp) => token && !timeExpired(tokenExp);

export const logOut = (payload, useFetch = LOGOUT.useFetch) => {

  const LOGOUT_ALERT = {
    type: 'loading',
    message: 'Signing out',
    priority: MODAL_PRIORITY.logOut
  }

  const dispatchLogout = () => store.dispatch(sessionActions.logout(payload))

  if (useFetch) {

    const args = {
      method: 'POST',
      endpoint: ENDPOINTS.session.logout,
      onResponse: modalFunctions.add(LOGOUT_ALERT),
      onSuccess: dispatchLogout,
      errorMessage: 'Unable to sign out.'
    }

    apiFetch(args);
  } else {
    dispatchLogout();
  }
}


// Router

export const makePath = (...parts) => _.replace(`/${_.filter(parts, p => !!p).map(p => _.trim(p, '/')).join('/')}/`, '//', '/');

export const getPath = (...keys) => makePath(...keys.map(key => PATHNAMES[key]));


// Alerts / Modals

const addAlert = alert => {
  if (!alert || !alert.message) return;
  alert.ID = randomID();
  store.dispatch(alertActions.add(alert));
  return () => store.dispatch(alertActions.remove(alert.ID));
}

export const alertFunctions = {
  add:     addAlert,
  remove:  alertID => store.dispatch(alertActions.remove(alertID)),
  clear:   alerts  => store.dispatch(alertActions.clear(alerts)),
  message: message => addAlert({ message, variant: 'secondary' }),
  success: message => addAlert({ message, variant: 'success' }),
  warning: message => addAlert({ message, variant: 'warning' }),
  danger:  message => addAlert({ message, variant: 'danger' }),
  info:    message => addAlert({ message, variant: 'info' }),
  error:   message => addAlert({ message, type: 'error' }),
  loading: message => addAlert({ message, type: 'loading' })
}

const addModal = modal => {
  if (!modal) return;
  modal.ID = randomID();
  if (modal.priority === undefined) modal.priority = MODAL_PRIORITY.default;
  store.dispatch(modalActions.add(modal));
  return () => store.dispatch(modalActions.remove(modal.ID));
}

export const modalFunctions = {
  add:          addModal,
  remove:       modalID      => store.dispatch(modalActions.remove(modalID)),
  increment:    ()           => store.dispatch(modalActions.increment()),
  clear:        ()           => store.dispatch(modalActions.clear()),
  message:      message      => !message ? null : addModal({ message, type: 'alert', variant: 'secondary' }),
  success:      message      => !message ? null : addModal({ message, type: 'alert', variant: 'success' }),
  warning:      message      => !message ? null : addModal({ message, type: 'alert', variant: 'warning' }),
  danger:       message      => !message ? null : addModal({ message, type: 'alert', variant: 'danger' }),
  info:         message      => !message ? null : addModal({ message, type: 'alert', variant: 'info' }),
  error:        message      => !message ? null : addModal({ message, type: 'alert', variant: 'danger'}),
  loading:      message      => !message ? null : addModal({ message, type: 'loading', priority: MODAL_PRIORITY.loading }),
  confirmation: (props = {}) => addAlert({ type: 'confirmation', ...props })
}


// Numbers / Date / Time

export const precedingZero = (num) => {
  let numString = num.toString();
  if (numString.length === 1)
    numString = '0' + numString;
  return numString;
}

export const toNumber = (num) => {
  return isNaN(num) ? 0 : num;
}

export const formatPlural = (value = 0, unit, usePrecedingZero = DATE.usePrecedingZero, usePlural = true) => {
  const float = parseFloat(value);
  if (isNaN(float)) return '';
  if (float === 0 && !usePrecedingZero) return '';
  return `${float} ${unit}${parseFloat(float) !== 1 && usePlural ? 's' : ''}`;
};


export const formatDollar = amount => {
  if (amount === undefined || amount === null || amount === '') return;
  if (isNaN(amount)) return 'NaN';
  const dollarFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
  return dollarFormat.format(parseFloat(amount))
}

export const compare = (value, operator, operand) => {
  switch (operator) {
    case '===':
      return value === operand;
    case '>':
      return value > operand;
    case '<':
      return value < operand;
    case '>=':
      return value >= operand;
    case '<=':
      return value <= operand;
    default:
      return undefined;
  }
}

export const getMidnight = (date) => {
  date = date instanceof Date ? date : new Date(date);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export const safeDate = date => {
  if (date instanceof Date) return date;
  const dateObject = new Date(date);
  return isNaN(dateObject.getTime()) ? '' : dateObject;
}

export const compareDate = (value, operator, operand) => {
  value = getMidnight(value).getTime();
  operand = getMidnight(operand).getTime();

  if (typeof operator === 'undefined') // If no operator is defined, just check that value is a valid date.
    return !isNaN(value);

  if (isNaN(value) && isNaN(operand)) // Else, first check that dates are valid.
    throw Error;

  return compare(value, operator, operand); // Return comparison;
}

export const formatDate = (value, yearLength = DATE.yearLength, usePrecedingZero = DATE.usePrecedingZero, separator = '/') => {
  const date = safeDate(value);
  if (!date) return '';
  let month = date.getMonth() + 1;
  if (usePrecedingZero) month = precedingZero(month);
  let day = date.getDate();
  if (usePrecedingZero) day = precedingZero(day);
  let year = date.getFullYear().toString().substring((4 - yearLength), 4);
  return `${month}${separator}${day}${separator}${year}`;
}

export const formatTime = (value, usePrecedingZero = DATE.usePrecedingZero) => {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(value);
  if (isNaN(date.getTime())) return undefined;
  let hours = precedingZero(date.getHours()%12 || 12, usePrecedingZero);
  let minutes = precedingZero(date.getMinutes(), true);
  return `${hours}:${minutes} ${date.getHours() > 11 ? 'PM' : 'AM'}`;
}

export const formatDateTime = (value, usePrecedingZero) => {
  const date = formatDate(value, usePrecedingZero);
  const time = formatTime(value, usePrecedingZero);
  if (!formatDate || !formatTime) return undefined;
  return `${date} ${time}`;
}


// Formatting

export const formatTel = tel => {
  var cleaned = ('' + tel).replace(/\D/g, '')
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  return match.slice(1, 4).join('-')
}

export const hideEmail = email => {
  if (!email) return '';
  const parts = email.split('@');
  parts[0] = parts[0].substring(0, 2) + '****';
  return parts.join('@');
}

export const hideTel = tel => {
  if (!tel) return '';
  const parts = formatTel(tel).split('-');
  parts[0] = parts[0].substring(0, 2) + '*';
  parts[1] = '***';
  return parts.join('-');
}

const amountFormat = (amount, decimal = 2, useSymbol = true) => {
  const float = parseFloat(amount);
  if (isNaN(float)) return '';
  const fixed = float.toFixed(decimal);
  return useSymbol ? `$${fixed}` : fixed;
}

const percentFormat = (amount, decimal = 2, useSymbol = true) => {
  const float = parseFloat(amount);
  if (isNaN(float)) return '';
  const percentage = float * 100;
  const fixed = !!decimal ? percentage.toFixed(decimal).replace(/.0{0,2}$/, "") : percentage;
  return useSymbol ? `${fixed}%` : fixed;
}

const dateFormat = (value, invalid) => {
  const date = value instanceof Date ? value : new Date(value);
  return isNaN(date) ? invalid : `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

const dotJoin = (...parts) => parts.filter(p => !!p).join('.').toLowerCase();

export const inputName = (name, ...parents) => dotJoin(dotJoin(...parents), name);

export const formatFunctions = {
  phone: formatTel,
  text:  formatTel,
  hide: {
    email: hideEmail,
    phone: hideTel,
    text:  hideTel,
  },
  amount: amountFormat,
  percent: percentFormat,
  date: dateFormat
}

export const getDates = () => {
  const dates = []
  for (let i = 1; i <= 30; i++) {
    dates.push(i)
  }
  return dates
}
