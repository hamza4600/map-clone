import React from 'react';

// GLOBAL VARIABLES
import { PATHNAMES } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// ROUTER COMPONENTS
import { Redirect, Route, Switch } from "react-router-dom";

// ROUTES
import Dashboard from './routes/Dashboard';
import Edit from './routes/edit/Edit';
import List from './routes/list/List';
import ChangePassword from '../user/routes/ChangePassword';
import Profile from '../user/routes/Profile';

// MAIN COMPONENT
const SysAdmin = () => (<>
  <Switch>
    <Route
      path={makePath(PATHNAMES.dashboard)}
      component={Dashboard}
      exact
    />
    {[
    ].reduce((arr, type, i) => ([
      ...arr,
      <Route
        key={2 * i + 0}
        path={makePath(type)}
        component={List[type]}
        exact
      />,
      <Route
        key={2 * i + 1}
        path={[
          makePath(type, PATHNAMES.add),
          makePath(type, PATHNAMES.edit, ':recordID')
        ]}
        component={Edit[type]}
        exact
      />
    ]), [])}
    <Route
      path={makePath(PATHNAMES.profile)}
      component={Profile}
      exact
    />
    <Route
      path={makePath(PATHNAMES.changePassword)}
      component={ChangePassword}
      exact
    />
    <Redirect
      to={makePath(PATHNAMES.dashboard)}
    />
  </Switch>
</>)

// EXPORT
export default SysAdmin;
