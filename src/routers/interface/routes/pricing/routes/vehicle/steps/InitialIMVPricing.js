import React from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// GLOBAL COMPONENTS
import Page from 'parts/page/Page';
import Vehicle from 'parts/vehicle/Vehicle';

// FORM COMPONENTS
import IMVPricing from 'parts/vehicle/forms/IMVPricing';

// MAIN COMPONENT
export default compose(
  connect(
    ({ record }) => ({ record })
  )
)(({
  // REDUX STATE
  record: {
    imvPricing
  },
  // REST
  ...props
}) => (
  <Vehicle.Form
    initialValues={imvPricing}
    args={{
      endpoint: ENDPOINTS.vehicle.steps.IMVPricing
    }}
  >
    <Page.Card
      title="Initial IMV Pricing"
    >
      <IMVPricing />
    </Page.Card>
    <Vehicle.Footer {...props} />
  </Vehicle.Form>
))
