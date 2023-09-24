import React from 'react';

// GLOBAL VARIABLES
import { PATHNAMES } from 'pathnames.js';

// FUNCTIONS
import { makePath } from 'functions.js';

// ROUTER COMPONENTS
import { Route, Switch } from "react-router-dom";

// LOCAL COMPONENTS
import AddIMV from './routes/AddIMV';
import AddPricingStrategy from './routes/AddPricingStrategy';
import AddVehicle from './routes/AddVehicle';
import EditVehicle from './routes/EditVehicle';
import ViewVehicle from './routes/ViewVehicle';

// MAIN COMPONENT
export default () => (
  <Switch>
    <Route
      path={[
        makePath(PATHNAMES.addVehicle, ':step', ':recordID'),
        makePath(PATHNAMES.addVehicle, ':step'),
        makePath(PATHNAMES.addVehicle)
      ]}
      component={AddVehicle}
    />
    <Route
      path={[
        makePath(PATHNAMES.editVehicle, ':step', ':recordID'),
        makePath(PATHNAMES.editVehicle, ':recordID')
      ]}
      component={EditVehicle}
    />
    <Route
      path={makePath(PATHNAMES.viewVehicle, ':recordID')}
      component={ViewVehicle}
    />
    <Route
      path={makePath(PATHNAMES.addIMV, ':recordID')}
      component={AddIMV}
    />
    <Route
      path={makePath(PATHNAMES.addPricingStrategy, ':recordID')}
      component={AddPricingStrategy}
    />
  </Switch>
)
