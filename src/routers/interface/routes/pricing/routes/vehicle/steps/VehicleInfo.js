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
import VehicleInfoForm from 'parts/vehicle/forms/VehicleInfo';

// MAIN COMPONENT
export default compose(
  connect(
    ({ record }) => ({ record })
  )
)(({
  // REDUX STATE
  record: {
    vehicle_info
  },
  // REST
  ...props
}) => (
  <Vehicle.Form
    initialValues={vehicle_info}
    args={{
      endpoint: ENDPOINTS.vehicle.update,
      method: vehicle_info?.vehicle_id ? 'PUT' : 'POST'
    }}
  >
    <Page.Card
      title="Add a Vehicle (Initial Add)"
    >
      <VehicleInfoForm />
    </Page.Card>
    <Vehicle.Footer {...props} />
  </Vehicle.Form>
))
