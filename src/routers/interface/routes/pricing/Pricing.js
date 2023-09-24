import React from 'react';

// GLOBAL VARIABLES
import { PATHNAMES } from 'pathnames.js';

// FUNCTIONS
import { makePath } from 'functions.js';

// ROUTER COMPONENTS
import { Redirect, Route, Switch } from "react-router-dom";

// ROUTES
import Inventory from './routes/inventory/Inventory';
import Vehicle from './routes/vehicle/Vehicle';
import ChangePassword from '../user/routes/ChangePassword';
import Profile from '../user/routes/Profile';

// MAIN COMPONENT
export default () => (
  <Switch>
    <Route
      path={[
        makePath(PATHNAMES.inventory, 'all', 'page', ':pageNumber'),
        makePath(PATHNAMES.inventory, 'all'),
        makePath(PATHNAMES.inventory, 'days', ':range', 'page', ':pageNumber'),
        makePath(PATHNAMES.inventory, 'days', ':range'),
        makePath(PATHNAMES.inventory, ':filter', 'page', ':pageNumber'),
        makePath(PATHNAMES.inventory, ':filter')
      ]}
      component={Inventory}
      exact
    />
    <Route
      path={[
        makePath(PATHNAMES.addVehicle, ':step', ':recordID'),
        makePath(PATHNAMES.addVehicle, ':step'),
        makePath(PATHNAMES.addVehicle),
        makePath(PATHNAMES.editVehicle, ':step', ':recordID'),
        makePath(PATHNAMES.editVehicle, ':recordID'),
        makePath(PATHNAMES.viewVehicle, ':recordID'),
        makePath(PATHNAMES.addIMV, ':recordID'),
        makePath(PATHNAMES.addPricingStrategy, ':recordID'),
      ]}
      component={Vehicle}
      exact
    />
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
    <Route
      render={() =>{
        return <Redirect to={makePath(PATHNAMES.inventory, 'all')} />;
      }}
    />
  </Switch>
)
