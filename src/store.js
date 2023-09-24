import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import { timeExpired } from 'functions.js';

import { alerts, configuration, dealership, lookups, menu, mobile, modals, preferences, record, records, sidebar, tables, token, tokenExp, user } from 'reducers.js';

const appReducer = combineReducers({ alerts, configuration, dealership, lookups, menu, mobile, modals, preferences, record, records, sidebar, tables, token, tokenExp, user });

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    state = {
      ...action.payload
    };
  }
  if (action.type === REHYDRATE) {
    if (action.payload) {
      const { _persist, ...payload } = action.payload;

      state = payload.tokenExp && timeExpired(payload.tokenExp) ? undefined : payload;
    }
  }
  return appReducer(state, action)
}

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [] // will not be persisted
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer
);
export const persistor = persistStore(store);
