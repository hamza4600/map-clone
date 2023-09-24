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
import EditVehicleNav from 'parts/menu/navs/EditVehicleNav';

// STEP COMPONENTS
import EntryQuestions from '../steps/EntryQuestions';
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
    documentTitle="Edit Vehicle"
    nav={EditVehicleNav}
  >
    <Switch>
      <Route
        path={[
          makePath(PATHNAMES.editVehicle, PATHNAMES.vehicleInfo, ':recordID'),
          makePath(PATHNAMES.editVehicle, PATHNAMES.vehicleInfo),
        ]}
        render={props => (
          <VehicleInfo
            {...props}
            next={makePath(PATHNAMES.editVehicle, PATHNAMES.entryQuestions)}
          />
        )}
      />
      <Route
        path={makePath(PATHNAMES.editVehicle, PATHNAMES.entryQuestions, ':recordID')}
        render={props => (
          <EntryQuestions
            {...props}
            back={makePath(PATHNAMES.editVehicle, PATHNAMES.vehicleInfo)}
            save={makePath(PATHNAMES.viewVehicle)}
          />
        )}
      />
      <Redirect
        to={makePath(PATHNAMES.editVehicle, PATHNAMES.vehicleInfo, recordID)}
      />
    </Switch>
  </Vehicle>
)
