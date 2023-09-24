import React from 'react';

// GLOBAL VARIABLES
import { GOAL_METHODS } from 'globals.js';

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Page from 'parts/page/Page';

// LOCAL COMPONENTS
import Info from '../tools/Info';

// MAIN COMPONENT
export default ({
  pricing = {
    imv: {
      vs_current: {}
    },
    discount: {},
    cpo: {
      with_imv: {
        vs_current: {}
      }
    }
  },
  strategy = {
    goal: {},
    imv: {},
    time_to_reach_goal: {},
    discount: {
      total: {},
      remaining: {}
    }
  },
  ...props
}) => (
  <Page.Module>
    <Row>
      <Col
        xs={24}
        lg={12}
      >
        <Page.Module.Header>Current Pricing Info</Page.Module.Header>
        <Info
          value={pricing.published_date}
          label="Last Price Published Date"
          format="date"
        />
        <Info
          value={pricing.days}
          label="Days Since Last LPPD"
          schema="days"
        />
        <Info
          value={pricing.current_price}
          label="Current Price"
          schema="dollars"
        />
        <Info
          value={pricing.prices_published}
          label="Number of Prices Published"
        />
        <Info
          value={pricing.imv.label}
          label="IMV Label"
        />
        <Info
          value={pricing.imv.amount}
          label="Current IMV"
          schema="dollars"
        />
        <Info
          value={pricing.imv.vs_current.amount}
          label="Current $ vs IMV"
          schema="dollars"
        />
        <Info
          value={pricing.imv.vs_current.percent}
          label="Current % vs IMV"
          schema="percent"
        />
        <Info
          value={pricing.discount.amount}
          label="Discount $ from Initial Price"
          schema="dollars"
        />
        <Info
          value={pricing.discount.percent}
          label="Discount % from Initial Price"
          schema="percent"
        />
        <Info
          value={pricing.cpo.eligible}
          label="IMV CPO"
        />
        <Info
          value={pricing.cpo.cost}
          label="CPO Cost"
          schema="dollars"
        />
        <Info
          value={pricing.cpo.with_imv.estimate}
          label="Estimated IMV with CPO"
          schema="dollars"
        />
        <Info
          value={pricing.cpo.with_imv.vs_current.amount}
          label="Current $ vs Est. IMV with CPO"
          schema="dollars"
        />
        <Info
          value={pricing.cpo.with_imv.vs_current.percent}
          label="Current % vs Est. IMV with CPO"
          schema="percent"
        />
      </Col>
      <Col
        xs={24}
        lg={12}
      >
        <Page.Module.Header>Current Strategy</Page.Module.Header>
        <Info
          value={strategy.published_date}
          label="New Price Published Date"
          format="date"
        />
        <Info
          value={strategy.days}
          label="Days to NPPD"
          schema="days"
        />
        <Info
          value={strategy.pricing_strategy}
          label="Pricing Strategy"
          options={Object.keys(GOAL_METHODS).map(key => GOAL_METHODS[key])}
        />
        <Info
          value={strategy.discount_strategy}
          label="Discount Strategy"
//          options={Object.keys(DISCOUNT_STRATEGIES).map(key => DISCOUNT_STRATEGIES[key])}
        />
        <Info
          value={strategy.goal.method}
          label="Goal (Price, IMV Label, $/% Below IMV)"
        />
        <Info
          value={strategy.goal.amount}
          label="Goal $"
          schema="dollars"
        />
        <Info
          value={strategy.imv.label}
          label="Goal IMV Label"
        />
        <Info
          value={strategy.imv.amount}
          label="Goal IMV $"
          schema="dollars"
        />
        <Info
          value={strategy.time_to_reach_goal.days_remaining}
          label="Days Remaining to Goal"
          schema="days"
        />
        <Info
          value={strategy.discount.total.amount}
          label="Total Discount to Goal"
          schema="dollars"
        />
        <Info
          value={strategy.discount.total.percent}
          label="Total Discount %"
          schema="percent"
        />
        <Info
          value={strategy.discount.remaining.amount}
          label="Discount $ Remaining"
          schema="dollars"
        />
        <Info
          value={strategy.discount.remaining.percent}
          label="Discount % Remaining"
          schema="percent"
        />
      </Col>
    </Row>
  </Page.Module>
)
