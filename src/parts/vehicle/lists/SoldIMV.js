import React from 'react';

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Page from 'parts/page/Page';

// LOCAL COMPONENTS
import DateUser from '../tools/DateUser';
import Info from '../tools/Info';

// MAIN COMPONENT
export default props => (
  <Page.Module>
    <Page.Module.Header>IMV at Time of Sale</Page.Module.Header>
    <Row>
      <Col
        xs={24}
        lg={12}
      >
        <Info
          as={DateUser}
          date={props.date}
          user={props.user}
          label="Last Update IMV Date"
        />
        <Info
          value={props.great}
          label="Great"
          schema="dollars"
        />
        <Info
          value={props.good}
          label="Good"
          schema="dollars"
        />
        <Info
          value={props.fair}
          label="Fair"
          schema="dollars"
        />
        <Info
          value={props.overpriced}
          label="Overpriced"
          schema="dollars"
        />
      </Col>
      <Col
        xs={24}
        lg={12}
      >
        <Page.Module.Spacer className="d-none d-lg-block" />
        <Info
          value={props.sold_vs_great}
          label="Sold Price vs. Great"
          schema="pillAboveBelow"
        />
        <Info
          value={props.sold_vs_good}
          label="Sold Price vs. Good"
          schema="pillAboveBelow"
        />
        <Info
          value={props.sold_vs_fair}
          label="Sold Price vs. Fair"
          schema="pillAboveBelow"
        />
        <Info
          value={props.sold_vs_overpriced}
          label="Sold Price vs. Overpriced"
          schema="pillAboveBelow"
        />
      </Col>
    </Row>
  </Page.Module>
)
