import React from 'react';

// LOCAL COMPONENTS
import AdjustmentModule from '../parts/AdjustmentModule';
import AmountPercentAdjustment from '../tools/AmountPercentAdjustment';
import Info from '../tools/Info';

// MAIN COMPONENT
export default ({
  eligible,
  cost,
  adjustment
}) => (
  <AdjustmentModule
    title="Certified Pre-Owned"
  >
    <Info
      value={eligible}
      label="CPO Eligible"
    />
    <Info
      value={cost}
      label="CPO Cost"
      schema="dollars"
    />
    <AmountPercentAdjustment
      values={adjustment}
      title="CPO"
      parent="Factory Invoice"
    />
  </AdjustmentModule>
)
