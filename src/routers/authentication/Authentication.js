import React from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { PATHNAMES } from 'pathnames.js';

// FUNCTIONS
import { makePath } from 'functions.js';

// HELPERS
import { checkRouting } from './helpers/checkRouting';

// ROUTER COMPONENTS
import { Redirect, Route, Switch } from "react-router-dom";

// GLOBAL COMPONENTS
import Modal from 'core/tools/modal/Modal';

// LOCAL COMPONENTS
import ChooseStore from './routes/ChooseStore';
import EnterCode from './routes/EnterCode';
import ForgotPassword from './routes/ForgotPassword';
import Login from './routes/Login';
import RequestCode from './routes/RequestCode';
import ResetPassword from './routes/ResetPassword';

// STYLES
import styles from './authentication.module.scss';

// MAIN COMPONENT
export default compose(
  checkRouting,
  connect(
    ({ alerts }) => ({ alerts })
  )
)(({
  alerts
}) => (
  <main
    className={styles.main}
  >
    <Switch>
      <Route
        path={makePath(PATHNAMES.login)}
        component={Login}
        exact
      />
      <Route
        path={makePath(PATHNAMES.forgotPassword)}
        component={ForgotPassword}
        exact
      />
      <Route
        path={[
          `${makePath(PATHNAMES.resetPassword)}:token`,
          makePath(PATHNAMES.resetPassword),
        ]}
        component={ResetPassword}
      />
      <Route
        path={makePath(PATHNAMES.requestCode)}
        component={RequestCode}
        exact
      />
      <Route
        path={makePath(PATHNAMES.enterCode)}
        component={EnterCode}
        exact
      />
      <Route
        path={makePath(PATHNAMES.chooseStore)}
        component={ChooseStore}
        exact
      />
      <Redirect to={{
        pathname: makePath(PATHNAMES.login),
        state: { alerts }
      }} />
    </Switch>
    <Modal.Router />
  </main>
))
