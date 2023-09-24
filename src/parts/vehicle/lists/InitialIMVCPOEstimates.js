import React from 'react';

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Page from 'parts/page/Page';

// LOCAL COMPONENTS
import Info from '../tools/Info';

// MAIN COMPONENT
export default props => (
  <Page.Module>
    <Page.Module.Header>Initial IMV - CPO Estimates</Page.Module.Header>
    <Row>
      <Col
        xs={24}
        lg={12}
      >
        <Info
          value={props.great}
          label="Est. Great with CPO"
          schema="dollars"
        />
        <Info
          value={props.good}
          label="Est. Good with CPO"
          schema="dollars"
        />
        <Info
          value={props.fair}
          label="Est. Fair with CPO"
          schema="dollars"
        />
        <Info
          value={props.overpriced}
          label="Est. Overpriced with CPO"
          schema="dollars"
        />
      </Col>
      <Col
        xs={24}
        lg={12}
      >
        <Info
          value={props.initial_vs_great}
          label="Inital Price vs. Est. Great with CPO"
          schema="pillAboveBelow"
        />
        <Info
          value={props.initial_vs_good}
          label="Inital Price vs. Est. Good with CPO"
          schema="pillAboveBelow"
        />
        <Info
          value={props.initial_vs_fair}
          label="Inital Price vs. Est. Fair with CPO"
          schema="pillAboveBelow"
        />
        <Info
          value={props.initial_vs_overpriced}
          label="Inital Price vs. Est. Overpriced with CPO"
          schema="pillAboveBelow"
        />
      </Col>
    </Row>
  </Page.Module>
)
