import React from 'react';

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Page from 'parts/page/Page';

// LOCAL COMPONENTS
import Info from '../tools/Info';

// MAIN COMPONENT
export default ({
  price = {},
  imv = {
    vs_initial: {}
  },
  total_adjustments = {},
  cpo = {
    with_imv: {
      vs_initial: {}
    }
  },
  ...props
}) => (
  <Page.Module>
    <Page.Module.Header>Initial Pricing</Page.Module.Header>
    <Row>
      <Col
        xs={24}
        lg={12}
      >
        <Info
          value={props.start_date}
          label="Start Date"
          format="date"
        />
        <Info
          value={price.base}
          label="Initial Price"
          schema="dollars"
        />
        <Info
          value={price.with_adjustments}
          label="Initial Price w/ All Adjusments"
          schema="dollars"
        />
        <Info
          value={imv.label}
          label="IMV Label"
        />
        <Info
          value={imv.amount}
          label="Initial IMV"
          schema="dollars"
        />
        <Info
          value={imv.vs_initial.amount}
          label="Initial $ vs IMV"
          schema="dollars"
        />
        <Info
          value={imv.vs_initial.percent}
          label="Initial % vs IMV"
          schema="percent"
        />
      </Col>
      <Col
        xs={24}
        lg={12}
      >
        <Info
          value={total_adjustments.amount}
          label="Total $ Adjustments"
          schema="dollars"
        />
        <Info
          value={total_adjustments.percent}
          label="Total $ Adjustments as a % of IMV"
          schema="percent"
        />
        <Info
          value={cpo.eligible}
          label="IMV CPO"
        />
        <Info
          value={cpo.cost}
          label="CPO Cost"
          schema="dollars"
        />
        <Info
          value={cpo.with_imv.estimate}
          label="Estimated IMV with CPO"
          schema="dollars"
        />
        <Info
          value={cpo.with_imv.vs_initial.amount}
          label="Initial $ vs Est. IMV with CPO"
          schema="dollars"
        />
        <Info
          value={cpo.with_imv.vs_initial.percent}
          label="Initial % vs Est. IMV with CPO"
          schema="percent"
        />
      </Col>
    </Row>
  </Page.Module>
)
