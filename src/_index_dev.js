import React from 'react';

// DEPENDENCIES
import FetchMock from 'react-fetch-mock'; // eslint-disable-line
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';

// GLOBAL VARIABLES
import { persistor, store } from 'store.js';

// HELPERS
import { unregister } from './serviceWorker';

// STYLESHEET
import 'css/stylesheet.scss';

// GLOBAL COMPONENTS
import App from 'App';

/* BEGIN FAKE API */
window.fetch = new FetchMock(require('./__mocks__'), {
  delay: 1000,
  exclude: [
    'http://localhost:3000/sample.pdf'
  ],
  fetch: window.fetch.bind(window)
}).fetch;
/* END FAKE API */

// RENDER
ReactDOM.render((
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
), document.getElementById('root'));

unregister();
