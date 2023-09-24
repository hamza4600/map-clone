import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

import { makePath, modalFunctions } from 'functions.js';

// HELPERS
import { RecordContext } from 'helpers/recordContext';

// CORE COMPONENTS
import Button from 'core/tools/Button';
import Form from 'core/form/Form';

// GLOBAL COMPONENTS
import Page from 'parts/page/Page';
import Vehicle from 'parts/vehicle/Vehicle';

// FORM COMPONENTS
import ApplyAddsDeducts from 'parts/vehicle/forms/ApplyAddsDeducts';
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
  ),
  withRouter
)(({
  back,
  next,
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
  // REACT ROUTER
  history,
  location,
  match: {
    params: {
      recordID
    }
  },
  staticContext
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

  // CONTEXT
  const {
    fetchRecord
  } = useContext(RecordContext) || {};

  // CALLBACKS
  const handleSuccess = useCallback(
    ({ vehicle_id }) => {
      fetchRecord(vehicle_id || recordID);
      return vehicle_id;
    },
    [recordID, fetchRecord]
  )

  return (<>
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
      <Form
        initialValues={pricing_option}
        endpoint={makePath(ENDPOINTS.vehicle.steps.pricingOption, recordID)}
        loadingMessage="Setting pricing option"
        errorMessage="Unable to set pricing option."
        successMessage="Pricing option set."
        onSuccess={handleSuccess}
      >
        <ApplyAddsDeducts
        />
      </Form>
      <Page.Card.Divider />
      <InitialIMV rows={tables.initialIMV} />
    </Page.Card>
    <Vehicle.Form
      args={{
        endpoint: ENDPOINTS.vehicle.steps.pricingStrategy
      }}
      initialValues={{
        vehicle_pricing: {
          initial_price: undefined
        }
      }}
      disabled={disabled}
    >
      <Page.Card
        title="Pricing Strategy"
      >
        <PricingStrategy
          initial={true}
          disabled={disabled}
        />
      </Page.Card>
      <Vehicle.Footer>
        <Vehicle.Button.Back to={back} />
        <Button
          label={<>Add<span className="d-none d-lg-inline">&nbsp;Another Strategy</span></>}
          icon="plus"
          onClick={() => modalFunctions.info('Under Construction')}
          outline
        />
        <Vehicle.Button.Next
          label="Finish"
          to={next}
        />
      </Vehicle.Footer>
    </Vehicle.Form>
  </>)
})
