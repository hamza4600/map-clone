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
  soldInfo = {},
  pricingAnalysis = {
    imv: {
      vs_sold: {}
    },
    reduction: {},
    vs_goal: {}
  }
}) => (
  <Page.Module>
    <Row>
      <Col
        xs={24}
        lg={12}
      >
        <Page.Module.Header>Sold Info</Page.Module.Header>
        <Info
          value={soldInfo.method}
          label="Retail or Wholesale"
        />
        <Info
          value={soldInfo.date}
          label="Delivery Date"
          format="date"
        />
        <Info
          value={soldInfo.age}
          label="Age"
          schema="days"
        />
        <Info
          value={soldInfo.initialAge}
          label="Age on Initial Price Published"
          schema="days"
        />
        <Info
          value={soldInfo.prices_published}
          label="Number of Prices Published"
        />
        <Info
          value={soldInfo.strategies}
          label="Number of Strategies Used"
        />
        <Info
          value={soldInfo.pricing_strategy}
          label="Pricing Strategy"
          options={Object.keys(GOAL_METHODS).map(key => GOAL_METHODS[key])}
        />
        <Info
          value={soldInfo.discount_strategy}
          label="Method of Discount"
//          options={Object.keys(DISCOUNT_STRATEGIES).map(key => DISCOUNT_STRATEGIES[key])}
        />
      </Col>
      <Col
        xs={24}
        lg={12}
      >
        <Page.Module.Header>Pricing Analysis</Page.Module.Header>
        <Info
          value={pricingAnalysis.sold_price}
          label="Actual Sold Price"
          schema="dollars"
        />
        <Info
          value={pricingAnalysis.matches_published}
          label="Mathces Last Published Price"
        />
        <Info
          value={pricingAnalysis.imv.label}
          label="IMV Label on Delivered"
        />
        <Info
          value={pricingAnalysis.imv.amount}
          label="IMV $ at Time of Sale"
          schema="dollars"
        />
        <Info
          value={pricingAnalysis.imv.vs_sold.amount}
          label="Sold $ vs IMV"
          schema="dollars"
        />
        <Info
          value={pricingAnalysis.imv.vs_sold.percent}
          label="Sold % vs IMV"
          schema="percent"
        />
        <Info
          value={pricingAnalysis.reduction.amount}
          label="Total $ Reduced"
          schema="dollars"
        />
        <Info
          value={pricingAnalysis.reduction.percent}
          label="Total % Reduced"
          schema="percent"
        />
        <Info
          value={pricingAnalysis.vs_goal.amount}
          label="$ from Goal on Delivered"
          schema="dollars"
        />
        <Info
          value={pricingAnalysis.vs_goal.percent}
          label="% from Goal on Delivered"
          schema="percent"
        />
      </Col>
    </Row>
  </Page.Module>
)
