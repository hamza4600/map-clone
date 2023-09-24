import React, { useEffect, useMemo, useState } from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

//import { modalFunctions } from 'functions.js';

// GLOBAL COMPONENTS
import Page from 'parts/page/Page';
import Record from 'parts/record/Record';
import Vehicle from 'parts/vehicle/Vehicle';

// FORM COMPONENTS
import PricingStrategy from 'parts/vehicle/forms/PricingStrategy';

// LIST COMPONENTS
import CertifiedPreOwned from 'parts/vehicle/lists/CertifiedPreOwned';
import Condition from 'parts/vehicle/lists/Condition';
import MSRPFactoryInvoice from 'parts/vehicle/lists/MSRPFactoryInvoice';
import VehicleHistory from 'parts/vehicle/lists/VehicleHistory';
import VehicleInfo from 'parts/vehicle/lists/VehicleInfo';
import Warranty from 'parts/vehicle/lists/Warranty';
import Total from 'parts/vehicle/tools/Total';

// TABLE COMPONENTS
import InitialIMV from 'parts/vehicle/tables/InitialIMV';

// MAIN COMPONENT
export default compose(
  connect(
    ({ record, tables }) => ({ record, tables })
  )
)(({
  // REDUX STATE
  record: {
    vehicle_info,
    msrp_factory_invoice,
    vehicle_history,
    warranty,
    mileage,
    condition,
    cpo,
    total,
    pricing_option = {}
  },
  tables,
  // REST
  ...props
}) => {

  // MEMOS
  const pricingOptionSet = useMemo(
    () => pricing_option.override !== undefined,
    [pricing_option.override]
  )

  // STATE
  const [disabled, disable] = useState(!pricingOptionSet);

  // EFFECTS
  useEffect(
    () => disable(!pricingOptionSet),
    [pricingOptionSet, disable]
  )

  return (
    <Vehicle
      documentTitle="Add Pricing Strategy"
    >
      <Page.Card
        title="Summary & Pricing Strategy"
      >
        <VehicleInfo {...vehicle_info} />
        <MSRPFactoryInvoice {...msrp_factory_invoice} />
        <VehicleHistory {...vehicle_history} />
        <Warranty {...warranty} {...mileage} />
        <Condition {...condition} />
        <CertifiedPreOwned {...cpo} />
        <Total
          label="Total Additions/Deductions"
          {...total}
        />
        <Page.Card.Divider />
        <InitialIMV rows={tables.initialIMV} />
      </Page.Card>
      <Record.Form
        {...props}
        args={{
          endpoint: ENDPOINTS.vehicle.pricingStrategy.update
        }}
        /*
        nextButton={{
          label: 'Finish',
          allowClickThru: false
        }}
        disabled={disabled}
        initialValues={{
          initial_flag: true,
          current_flag: true
        }}
        otherButtons={[
          {
            label: 'Add Another Strategy',
            icon: 'add',
            onClick: () => modalFunctions.info('Under Construction')
          }
        ]}
        */
      >
        <Page.Card
          title="Pricing Strategy"
        >
          <PricingStrategy
            disabled={disabled}
          />
        </Page.Card>
      </Record.Form>
    </Vehicle>
  )
})
