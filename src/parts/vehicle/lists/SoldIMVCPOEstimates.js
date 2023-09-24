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
    <Page.Module.Header>IMV at Time of Sale - CPO Estimates</Page.Module.Header>
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
          value={props.sold_vs_great}
          label="Sold Price vs. Est. Great with CPO"
          schema="pillAboveBelow"
        />
        <Info
          value={props.sold_vs_good}
          label="Sold Price vs. Est. Good with CPO"
          schema="pillAboveBelow"
        />
        <Info
          value={props.sold_vs_fair}
          label="Sold Price vs. Est. Fair with CPO"
          schema="pillAboveBelow"
        />
        <Info
          value={props.sold_vs_overpriced}
          label="Sold Price vs. Est. Overpriced with CPO"
          schema="pillAboveBelow"
        />
      </Col>
    </Row>
  </Page.Module>
)
