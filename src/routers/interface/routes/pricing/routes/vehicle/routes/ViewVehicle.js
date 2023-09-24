import React from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { PATHNAMES } from 'pathnames.js';

// FUNCTIONS
import { makePath } from 'functions.js';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Page from 'parts/page/Page';
import Vehicle from 'parts/vehicle/Vehicle';

// MENU COMPONENTS
import VehicleNav from 'parts/menu/navs/VehicleNav';

// LIST COMPONENTS
import CertifiedPreOwned from 'parts/vehicle/lists/CertifiedPreOwned';
import Condition from 'parts/vehicle/lists/Condition';
import CurrentIMV from 'parts/vehicle/lists/CurrentIMV';
import CurrentIMVCPOEstimates from 'parts/vehicle/lists/CurrentIMVCPOEstimates';
import CurrentPricingStrategy from 'parts/vehicle/lists/CurrentPricingStrategy';
import InitialIMV from 'parts/vehicle/lists/InitialIMV';
import InitialIMVCPOEstimates from 'parts/vehicle/lists/InitialIMVCPOEstimates';
import InitialPricing from 'parts/vehicle/lists/InitialPricing';
import InitialStrategyPricingAdjustments from 'parts/vehicle/lists/InitialStrategyPricingAdjustments';
import MSRPFactoryInvoice from 'parts/vehicle/lists/MSRPFactoryInvoice';
import SoldIMV from 'parts/vehicle/lists/SoldIMV';
import SoldIMVCPOEstimates from 'parts/vehicle/lists/SoldIMVCPOEstimates';
import SoldInfoPricingAnalysis from 'parts/vehicle/lists/SoldInfoPricingAnalysis';
import VehicleInfo from 'parts/vehicle/lists/VehicleInfo';
import VehicleHistory from 'parts/vehicle/lists/VehicleHistory';
import Warranty from 'parts/vehicle/lists/Warranty';
import Total from 'parts/vehicle/tools/Total';

// TABLE COMPONENTS
import IMVPricingHistory from 'parts/vehicle/tables/IMVPricingHistory';

// MAIN COMPONENT
export default compose(
  connect(
    ({ mobile, record }) => ({ mobile, record })
  )
)(({
  children,
  // REDUX STATE
  mobile,
  record,
  // REACT ROUTER PROPS
  match: {
    params: {
      recordID
    }
  }
}) => (
  <Vehicle
    documentTitle={record.vehicle_info ? record.vehicle_info.stock_no : 'View'}
    nav={VehicleNav}
  >
    <Page.Card
      title="Vehicle Info"
      id="vehicleDetails"
      headerTools={(
        <Button
          variant="light"
          label={!mobile ? 'Edit' : undefined}
          icon="edit"
          to={makePath(PATHNAMES.editVehicle, recordID)}
        />
      )}
    >
      <VehicleInfo {...record.vehicle_info} />
      <MSRPFactoryInvoice {...record.msrp_factory_invoice} />
      <VehicleHistory {...record.vehicle_history} />
      <Warranty {...record.warranty} {...record.mileage} />
      <Condition {...record.condition} />
      <CertifiedPreOwned {...record.cpo} />
      <Total
        variant="primary"
        label="Total Additions/Deductions"
        {...record.total}
      />
    </Page.Card>
    <Page.Card
      title="Initial Pricing Strategy & IMV"
      id="initialIMVPricing"
    >
      <InitialPricing {...record.initial_pricing} />
      <InitialStrategyPricingAdjustments {...record.initial_strategy} {...record.pricing_adjustments} />
      <InitialIMV {...record.initial_imv} />
      <InitialIMVCPOEstimates {...record.initial_cpo_estimates} />
    </Page.Card>
    <Page.Card
      title="Current Pricing Strategy & IMV"
      id="currentIMVPricing"
      headerTools={(
        <Button
          variant="light"
          label={!mobile ? 'Add Pricing Strategy' : undefined}
          icon="edit"
          to={makePath(PATHNAMES.addPricingStrategy, recordID)}
        />
      )}
    >
      <CurrentPricingStrategy pricing={record.current_pricing} strategy={record.current_strategy} />
      <CurrentIMV {...record.current_imv} />
      <CurrentIMVCPOEstimates {...record.current_cpo_estimates} />
    </Page.Card>
    <Page.Card
      title="IMV Pricing History"
      id="imvPricingHistory"
      headerTools={(
        <Button
          variant="light"
          label={!mobile ? 'Add IMV Entry' : undefined}
          icon="edit"
          to={makePath(PATHNAMES.addIMV, recordID)}
        />
      )}
    >
      <IMVPricingHistory rows={record.pricing_history} />
    </Page.Card>
    <Page.Card
      title="Sold Info"
      id="soldInfo"
    >
      <SoldInfoPricingAnalysis soldInfo={record.sold_info} pricingAnalysis={record.pricing_analysis} />
      <SoldIMV {...record.sold_imv} />
      <SoldIMVCPOEstimates {...record.sold_cpo_estimates} />
    </Page.Card>
  </Vehicle>
))
