import React from 'react';

// DEPENDENCIES
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'
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

// BUGSNAG CODE
Bugsnag.start({
  apiKey: '9da2adfc0b530a800432639caacfe1e3',
  plugins: [new BugsnagPluginReact()]
})

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
