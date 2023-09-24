// DEPENDENCIES
import _ from 'lodash';

// GLOBAL VARIABLES
import { COLUMNS } from 'columns.js';


// SESSION

export const configuration = (state = null, { type, ...action }) => {
  switch(type) {
    case 'SET_CONFIGURATION':
      return { ...action.configuration };
    case 'CLEAR_CONFIGURATION':
      return null;
    default:
      return state;
  }
}

export const user = (state = {}, { type, ...action }) => {
  switch(type) {
    case 'LOGIN_USER':
      return { ...action.user };
    case 'SET_VERIFICATION':
      return {
        ...state,
        verified: action.verified
      };
    default:
      return state;
  }
}

export const token = (state = null, { type, ...action }) => {
  switch(type) {
    case 'LOGIN_USER':
      return action.token;
    case 'SET_DEALERSHIP':
      return action.token;
    default:
      return state;
  }
}

export const tokenExp = (state = null, { type, ...action }) => {
  switch(type) {
    case 'LOGIN_USER':
      return action.token_exp;
    case 'SET_DEALERSHIP':
      return action.token_exp;
    case 'EXTEND_SESSION':
      return action.token_exp;
    default:
      return state;
  }
}

export const dealership = (state = null, { type, ...action }) => {
  switch(type) {
    case 'LOGIN_USER':
      if (action.user.stores.length > 1) return null;
      else return action.user.dealership_store_id;
    case 'SET_DEALERSHIP':
      return action.dealership_store_id;
    default:
      return state;
  }
}


// PREFERENCES

export const preferences = (state = {}, { type, ...action }) => {
  switch(type) {
    case 'LOGIN_USER':
      return {
        ...state,
        inventorySettings: _.mapValues(COLUMNS, group => ({
          ...group,
          columns: {
            ..._.mapValues(group.columns, column => ({
              ...column,
              show: true
            }))
          },
          show: true
        }))
      };
    case 'UPDATE_PREFERENCE':
      return {
        ...state,
        [action.key]: action.setting
      };
    default:
      return state;
  }
}


// INTERFACE

export const mobile = (state = false, { type, ...action }) => {
  switch(type) {
    case 'SET_SCREEN_SIZE':
      return action.isMobile;
    default:
      return state;
  }
}

export const menu = (state = false, {type, ...action }) => {
  switch(type) {
    case 'SET_COLLAPSE':
      return action.collapse || !state;
    default:
      return state;
  }
}

export const alerts = (state = [], { type, ...action }) => {
  let newState = [ ...state ];

  switch(type) {
    case 'ADD_ALERTS':
      newState.unshift(...action.alerts);
      return newState;
    case 'REMOVE_ALERT':
      newState.splice(newState.findIndex(alert => alert.ID === action.alertID), 1);
      return newState;
    case 'CLEAR_ALERTS':
      newState = Array.isArray(action.alerts) ? [ ...action.alerts ] : [];
      return newState;
    case 'LOGIN_USER':
      return [];
    case 'FLUSH_STATE':
      return [];
    default:
      return state;
  }
}

export const modals = (state = [], { type, ...action }) => {
  const newState = [ ...state ];

  switch(type) {
    case 'ADD_MODAL':
      const insertionPoint = newState.findIndex(modal => modal.priority < action.modal.priority);
      insertionPoint === -1 ? newState.push(action.modal) : newState.splice(insertionPoint, 0, action.modal);
      return newState;
    case 'REMOVE_MODAL':
      const modalKey = newState.findIndex(modal => modal.ID === action.modalID);
      modalKey === 0 ? newState[modalKey].close = true : newState.splice(modalKey, 1);
      return newState;
    case 'INCREMENT_MODAL':
      newState.shift();
      return newState;
    case 'CLEAR_MODALS':
      return [];
    default:
      return state;
  }
}

export const sidebar = (state = false, { type, ...action }) => {
  switch(type) {
    case 'TOGGLE_SIDEBAR':
      return action.toggle !== undefined ? action.toggle : !state;
    default:
      return state;
  }
}


// DATA

export const lookups = (state = {}, { type, ...action }) => {
  const { key, payload = [] } = action;
  switch(type) {
    case 'INIT_LOOKUP':
      return {
        ...state,
        [key]: undefined
      }
    case 'LOAD_LOOKUP':
      return {
        ...state,
        [key]: Array.isArray(payload) ? [ ...payload ] : { ...payload }
      }
    case 'LOOKUP_ERROR':
      return {
        ...state,
        [key]: new Error()
      }
    case 'FLUSH_LOOKUP':
      const newState = {...state};
      delete newState[key];
      return newState;
    default:
      return state;
  }
}

const RECORDS_EMPTY = {
  total: 0,
  list: []
}

export const records = (state = RECORDS_EMPTY, { type, ...action }) => {
  switch(type) {
    case 'LIST_RECORDS':
      return {
        total: action.total,
        list: Array.isArray(action.list) ?  [ ...action.list ] : RECORDS_EMPTY.list
      }
    case 'FLUSH_RECORDS':
      return RECORDS_EMPTY;
    default:
      return state;
  }
}

export const record = (state = {}, { type, ...action }) => {
  switch(type) {
    case 'LOAD_RECORD':
      return {
        ...action.record
      }
    case 'APPEND_RECORD':
      return {
        ...state,
        [action.key]: action.data
      }
    case 'FLUSH_RECORDS':
      return {};
    default:
      return state;
  }
}

export const tables = (state = {}, { type, ...action }) => {
  switch(type) {
    case 'LOAD_TABLE':
      return {
        ...state,
        [action.key]: Array.isArray(action.payload) ? [ ...action.payload ] : new Error()
      }
    case 'TABLE_ERROR':
      return {
        ...state,
        [action.key]: new Error()
      }
    case 'FLUSH_RECORDS':
      return {};
    default:
      return state;
  }
}
