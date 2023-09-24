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
    <Page.Module.Header>Current IMV</Page.Module.Header>
    <Row>
      <Col
        xs={24}
        lg={12}
      >
        <Info
          as={DateUser}
          date={props.date}
          user={props.user}
          label="Last Updated IMV Date"
        />
        <Info
          value={props.days}
          label="Days Since Last Update"
          schema="days"
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
        <Page.Module.Spacer className="d-none d-lg-block" />
        <Info
          value={props.current_vs_great}
          label="Current Price vs. Great"
          schema="pillAboveBelow"
        />
        <Info
          value={props.current_vs_good}
          label="Current Price vs. Good"
          schema="pillAboveBelow"
        />
        <Info
          value={props.current_vs_fair}
          label="Current Price vs. Fair"
          schema="pillAboveBelow"
        />
        <Info
          value={props.current_vs_overpriced}
          label="Current Price vs. Overpriced"
          schema="pillAboveBelow"
        />
      </Col>
    </Row>
  </Page.Module>
)
