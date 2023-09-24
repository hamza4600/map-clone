import React from 'react';

// LOCAL COMPONENTS
import AdjustmentModule from '../parts/AdjustmentModule';
import AmountPercentAdjustment from '../tools/AmountPercentAdjustment';
import Info from '../tools/Info';

// CHILD COMPONENT
const RepairCost = ({
  values = {},
  labels = {},
  title,
  slug = title.toLowerCase(),
}) => (
  <>
    <Info
      value={values[`${slug}_cosmetic_damage`]}
      label={labels.damage || `${title} Cosmetic Damage`}
    />
    <Info
      value={values[`${slug}_cosmetic_damage_repair_cost`]}
      label={labels.amount || `Amount of ${title} Repair`}
      schema="dollars"
    />
    <AmountPercentAdjustment
      values={values[`${slug}_cosmetic_damage_deduction`] || {}}
      labels={labels.adjustment}
      title={`${title} Cosmetic Damage`}
      deduction
    />
  </>
)

// MAIN COMPONENT
export default props => (
  <AdjustmentModule
    title="Condition"
  >
    <RepairCost
      values={props}
      title="Previous"
    />
    <RepairCost
      values={props}
      labels={{
        amount: "Amount of Repairs Needed"
      }}
      title="Current"
      slug="existing"
    />
  </AdjustmentModule>
)
