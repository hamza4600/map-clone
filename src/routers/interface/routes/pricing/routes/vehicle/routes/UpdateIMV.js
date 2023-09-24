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
export default ({
  match: {
    params: {
      vehicleIMVPricingID
    }
  }
}) => (
  <Vehicle
    documentTitle="Update IMV"
  >
    <Record.Form
      args={{
        endpoint: recordID => ENDPOINTS.vehicle.IMVPricing.update(recordID, vehicleIMVPricingID),
        loadingMessage: "Updating IMV pricing entry",
        successMessage: "IMV pricing entry updated.",
        errorMessage: "Unable to update IMV pricing entry.",
        successRedirect: PATHNAMES.viewVehicle
      }}
    >
      <Page.Card
        title="Update IMV Pricing Entry"
      >
        <IMVPricing />
      </Page.Card>
    </Record.Form>
  </Vehicle>
)
