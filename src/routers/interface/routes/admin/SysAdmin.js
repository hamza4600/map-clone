import React from 'react';

// GLOBAL VARIABLES
import { PATHNAMES } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// ROUTER COMPONENTS
import { Redirect, Route, Switch } from "react-router-dom";

// ROUTES
import Edit from './routes/edit/Edit';
import List from './routes/list/List';
import ChangePassword from '../user/routes/ChangePassword';
import Profile from '../user/routes/Profile';

// MAIN COMPONENT
const SysAdmin = () => (<>
  <Switch>
    {[
      'users'
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
          makePath(type, 'add'),
          makePath(type, 'edit', ':recordID')
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
      to={makePath(PATHNAMES.users)}
    />
  </Switch>
</>)

// EXPORT
export default SysAdmin;
