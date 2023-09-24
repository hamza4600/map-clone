import React from 'react';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';
import { PATHNAMES } from 'pathnames.js';

// GLOBAL COMPONENTS
import Page from 'parts/page/Page';
import Record from 'parts/record/Record';
import Vehicle from 'parts/vehicle/Vehicle';

// FORM COMPONENTS
import IMVPricing from 'parts/vehicle/forms/IMVPricing';

// MAIN COMPONENT
export default () => (
  <Vehicle
    documentTitle="Add IMV"
  >
    <Record.Form
      args={{
        endpoint: ENDPOINTS.vehicle.IMVPricing.update,
        loadingMessage: "Adding IMV pricing entry",
        successMessage: "IMV pricing entry added.",
        errorMessage: "Unable to add IMV pricing entry.",
        successRedirect: PATHNAMES.viewVehicle
      }}
    >
      <Page.Card
        title="Add IMV Pricing Entry"
      >
        <IMVPricing />
      </Page.Card>
    </Record.Form>
  </Vehicle>
)
