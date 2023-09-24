import React from 'react';

// LOCAL COMPONENTS
import AdjustmentModule from '../parts/AdjustmentModule';
import AmountPercentAdjustment from '../tools/AmountPercentAdjustment';
import Info from '../tools/Info';

// CHILD COMPONENT
const DocumentPrices = ({
  total_amount,
  base_amount,
  factory_options = {},
  title,
  ...props
}) => (
  <>
    <Info
      value={total_amount}
      label={`Total ${title}`}
      schema="dollars"
    />
    <Info
      value={base_amount}
      label={`Base ${title}`}
      schema="dollars"
    />
    <AmountPercentAdjustment
      values={factory_options}
      title="Factory Options"
      parent={title}
      adjustment={false}
    />
  </>
)

// MAIN COMPONENT
export default ({
  msrp = {},
  factory_invoice = {},
  factory_option_imv_adjustment = {},
  ...props
}) => (
  <AdjustmentModule
    title="MSRP and Factory Invoice"
  >
    <DocumentPrices
      {...msrp}
      title="MSRP"
    />
    <DocumentPrices
      {...factory_invoice}
      title="Factory Invoice"
    />
    <AmountPercentAdjustment
      values={factory_option_imv_adjustment}
      title="Factory Options"
      labels={{
        amount: 'Factory Options Value to Add',
        percent: 'Factory Options % of IMV'
      }}
    />
  </AdjustmentModule>
)
