import React from 'react';

// GLOBAL VARIABLES
import { PATHNAMES } from 'pathnames.js';

// FUNCTIONS
import { makePath } from 'functions.js';

// ROUTER COMPONENTS
import { Redirect, Route, Switch } from "react-router-dom";

// GLOBAL COMPONENTS
import Vehicle from 'parts/vehicle/Vehicle';

// MENU COMPONENTS
import AddVehicleNav from 'parts/menu/navs/AddVehicleNav';

// STEP COMPONENTS
import EntryQuestions from '../steps/EntryQuestions';
import InitialIMVPricing from '../steps/InitialIMVPricing';
import PricingStrategy from '../steps/PricingStrategy';
import Success from '../steps/Success';
import VehicleInfo from '../steps/VehicleInfo';

// MAIN COMPONENT
export default ({
  // REACT ROUTER
  match: {
    params: {
      recordID
    }
  }
}) => (
  <Vehicle
    documentTitle="Add Vehicle"
    nav={AddVehicleNav}
  >
    <Switch>
      <Route
        path={[
          makePath(PATHNAMES.addVehicle, PATHNAMES.vehicleInfo, ':recordID'),
          makePath(PATHNAMES.addVehicle, PATHNAMES.vehicleInfo),
        ]}
        render={props => (
          <VehicleInfo
            {...props}
            next={makePath(PATHNAMES.addVehicle, PATHNAMES.entryQuestions)}
          />
        )}
      />
      <Route
        path={makePath(PATHNAMES.addVehicle, PATHNAMES.entryQuestions, ':recordID')}
        render={props => (
          <EntryQuestions
            {...props}
            back={makePath(PATHNAMES.addVehicle, PATHNAMES.vehicleInfo)}
            next={makePath(PATHNAMES.addVehicle, PATHNAMES.initialIMVPricing)}
          />
        )}
      />
      <Route
        path={makePath(PATHNAMES.addVehicle, PATHNAMES.initialIMVPricing, ':recordID')}
        render={props => (
          <InitialIMVPricing
            {...props}
            back={makePath(PATHNAMES.addVehicle, PATHNAMES.entryQuestions)}
            next={makePath(PATHNAMES.addVehicle, PATHNAMES.pricingStrategy)}
          />
        )}
      />
      <Route
        path={makePath(PATHNAMES.addVehicle, PATHNAMES.pricingStrategy, ':recordID')}
        render={props => (
          <PricingStrategy
            {...props}
            back={makePath(PATHNAMES.addVehicle, PATHNAMES.initialIMVPricing)}
            next={makePath(PATHNAMES.addVehicle, PATHNAMES.success)}
          />
        )}
      />
      <Route
        path={makePath(PATHNAMES.addVehicle, PATHNAMES.success, ':recordID')}
        component={Success}
      />
      <Redirect
        to={makePath(PATHNAMES.addVehicle, PATHNAMES.vehicleInfo, recordID)}
      />
    </Switch>
  </Vehicle>
)
