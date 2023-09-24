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
    <Page.Module.Header>Initial IMV</Page.Module.Header>
    <Row>
      <Col
        xs={24}
        lg={12}
      >
        <Info
          as={DateUser}
          date={props.date}
          user={props.user}
          label="Initial IMV Date"
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
          value={props.initial_vs_great}
          label="Inital Price vs. Great"
          schema="pillAboveBelow"
        />
        <Info
          value={props.initial_vs_good}
          label="Inital Price vs. Good"
          schema="pillAboveBelow"
        />
        <Info
          value={props.initial_vs_fair}
          label="Inital Price vs. Fair"
          schema="pillAboveBelow"
        />
        <Info
          value={props.initial_vs_overpriced}
          label="Inital Price vs. Overpriced"
          schema="pillAboveBelow"
        />
      </Col>
    </Row>
  </Page.Module>
)
