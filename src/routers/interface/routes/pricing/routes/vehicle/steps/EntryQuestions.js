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
import Condition from 'parts/vehicle/forms/Condition';
import CPOQuestions from 'parts/vehicle/forms/CPOQuestions';
import Mileage from 'parts/vehicle/forms/Mileage';
import MSRPFactoryInvoice from 'parts/vehicle/forms/MSRPFactoryInvoice';
import VehicleHistory from 'parts/vehicle/forms/VehicleHistory';
import Warranty from 'parts/vehicle/forms/Warranty';

// MAIN COMPONENT
export default compose(
  connect(
    ({ record, user }) => ({ record, user })
  )
)(({
  // REDUX STATE
  record: {
    msrp_factory_invoice,
    vehicle_history,
    warranty,
    mileage: {
      amount_per_mileage_adjustment
    } = {},
    cpo,
    condition
  },
  user,
  // REST
  ...props
}) => (
  <Vehicle.Form
    initialValues={{
      msrp_factory_invoice,
      vehicle_history,
      warranty,
      mileage: {
        amount_per_mileage_adjustment
      },
      cpo,
      condition,
      created_at: new Date(),
      created_by: user.user_account_id
    }}
    args={{
      endpoint: ENDPOINTS.vehicle.steps.entryQuestions
    }}
  >
    <Page.Card
      title="Entry Questions"
    >
      <MSRPFactoryInvoice />
      <VehicleHistory />
      <Warranty />
      <Mileage />
      <CPOQuestions />
      <Condition />
    </Page.Card>
    <Vehicle.Footer {...props} />
  </Vehicle.Form>
))
