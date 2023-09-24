import React from 'react';

// LOCAL COMPONENTS
import AdjustmentModule from '../parts/AdjustmentModule';
import AmountPercentAdjustment from '../tools/AmountPercentAdjustment';
import Info from '../tools/Info';

// CHILD COMPONENT
const History = ({
  clean,
  title_branded,
  title_branded_deduction = {},
  accident_indicator,
  accident_indicator_deduction = {},
  title
}) => (
  <>
    <Info
      value={clean}
      label={`Clean ${title}`}
    />
    <Info
      value={title_branded}
      label={`${title} Branded Title`}
    />
    <AmountPercentAdjustment
      values={title_branded_deduction}
      title="Branded Title"
      deduction
    />
    <Info
      value={accident_indicator}
      label={`${title} Accident Indicator`}
    />
    <AmountPercentAdjustment
      values={accident_indicator_deduction}
      title="Accident Indicator"
      deduction
    />
  </>
)

// MAIN COMPONENT
export default ({
  carfax = {},
  autocheck = {},
  multiple_owner: {
    total_owners,
    multiple_owner_deduction
  } = {},
  // REST
  ...props
}) => (
  <AdjustmentModule
    title="Vehicle History"
  >
    <History
      {...carfax}
      title="Carfax"
    />
    <History
      {...autocheck}
      title="Autocheck"
    />
    <Info
      value={total_owners}
      label="Number of Owners"
    />
    <AmountPercentAdjustment
      values={multiple_owner_deduction}
      title="Multiple Owner"
      deduction
    />
  </AdjustmentModule>
)
