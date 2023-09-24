import React from 'react';

// GLOBAL VARIABLES
import { GOAL_METHODS } from 'globals.js';

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Page from 'parts/page/Page';

// LOCAL COMPONENTS
import Info from '../tools/Info';

const InitialVSIMV = ({
  label,
  amount,
  percent
}) => (
  <>
    <Page.Module.Subheader>{label} Adjustment: ($)</Page.Module.Subheader>
    <Info
      value={amount}
      label={`Initial $ vs IMV with ${label} Adjustment`}
      schema="dollars"
    />
    <Info
      value={percent}
      label={`Initial % vs IMV with ${label} Adjustment`}
      schema="percent"
    />
  </>
)

// MAIN COMPONENT
export default ({
  goal= {},
  imv = {},
  discount = {
    total: {}
  },
  time_to_reach_goal = {},
  total_discount = {},
  stagger = {},
  carfax_autocheck = {},
  accident_indicator = {},
  multiple_owner = {},
  cosmetic_damage = {},
  ...props
}) => (
  <Page.Module>
    <Row>
      <Col
        xs={24}
        lg={12}
      >
        <Page.Module.Header>Initial Strategy</Page.Module.Header>
        <Info
          value={props.date_added}
          label="Strategy Added Date"
          format="date"
        />
        <Info
          value={props.pricing_strategy}
          label="Pricing Strategy"
          options={Object.keys(GOAL_METHODS).map(key => GOAL_METHODS[key])}
        />
        <Info
          value={props.discount_strategy}
          label="Discount Strategy"
//          options={Object.keys(DISCOUNT_STRATEGIES).map(key => DISCOUNT_STRATEGIES[key])}
        />
        <Info
          value={goal.method}
          label="Goal (Price, IMV Label, $/% Below IMV)"
        />
        <Info
          value={goal.amount}
          label="Goal $"
          schema="dollars"
        />
        <Info
          value={imv.label}
          label="Goal IMV Label"
        />
        <Info
          value={imv.amount}
          label="Goal IMV $"
          schema="dollars"
        />
        <Info
          value={time_to_reach_goal.days_to_reach}
          label="Days to Reach Goal"
          schema="days"
        />
        <Info
          value={time_to_reach_goal.days_to_achieve}
          label="# of Days to Achieve Goal"
          schema="days"
        />
        <Info
          value={time_to_reach_goal.days_remaining}
          label="Days Remaining to Goal"
          schema="days"
        />
        <Info
          value={discount.total.amount}
          label="Total Discount to Goal"
          schema="dollars"
        />
        <Info
          value={discount.total.percent}
          label="Total Discount %"
          schema="percent"
        />
        <Info
          value={time_to_reach_goal.publish_frequency}
          label="Publish Price Frequency"
        />
        <Info
          value={stagger.active}
          label="Stagger"
        />
        <Info
          value={stagger.range}
          label="Stagger Range"
          schema="dollars"
        />
        <Info
          value={stagger.publish_frequency}
          label="Stagger Publish Price Frequency"
        />
      </Col>
      <Col
        xs={24}
        lg={12}
      >
        <Page.Module.Header>Pricing Adjustments</Page.Module.Header>
        <div>
          <InitialVSIMV
            label="Carfax / Autocheck"
            {...carfax_autocheck}
          />
          <InitialVSIMV
            label="Accident Indicator"
            {...accident_indicator}
          />
          <InitialVSIMV
            label="More than 1-Owner"
            {...multiple_owner}
          />
          <InitialVSIMV
            label="Cosmetic Damage"
            {...cosmetic_damage}
          />
        </div>
      </Col>
    </Row>
  </Page.Module>
)
