import React from 'react';

// LOCAL COMPONENTS
import AdjustmentModule from '../parts/AdjustmentModule';
import AmountPercentAdjustment from '../tools/AmountPercentAdjustment';
import Info from '../tools/Info';

// CHILD COMPONENT
const WarrantyRemaining = ({
  months,
  miles,
  title
}) => (
  <>
    <Info
      value={months}
      label={`${title} (Months Remaining)`}
    />
    <Info
      value={miles}
      label={`${title} (Miles Remaining)`}
      schema="miles"
    />
  </>
)

// MAIN COMPONENT
export default ({
  factory_warranty,
  service_date,
  bb_warranty_remaining = {},
  powertrain_warranty_remaining = {},
  milage_adjustment,
  amount_per_mileage_adjustment,
  mileage_imv_adjustment = {},
  ...props
}) => (
  <AdjustmentModule
    title="Warranty"
  >
    <Info
      value={factory_warranty}
      label="Under Factory Warranty"
    />
    <Info
      value={service_date}
      label="Approximate In-Service Date"
      format="date"
    />
    <WarrantyRemaining
      {...bb_warranty_remaining}
      title="B-B Warranty"
    />
    <WarrantyRemaining
      {...powertrain_warranty_remaining}
      title="Powertrain Warranty"
    />
    <Info
      value={milage_adjustment}
      label="Mileage Adjustment"
      schema="miles"
    />
    <Info
      value={amount_per_mileage_adjustment}
      label="Amount Per Mileage Adjustment"
      schema="dollars"
    />
    <AmountPercentAdjustment
      values={mileage_imv_adjustment}
      title="Mileage"
    />
  </AdjustmentModule>
)
