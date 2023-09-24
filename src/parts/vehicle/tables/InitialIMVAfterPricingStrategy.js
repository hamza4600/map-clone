import React from 'react';

// DEPENDENICES
import { withRouter } from 'react-router';
import { compose } from 'redux';

// GLOBAL VARIABLES
//import { ENDPOINTS } from 'endpoints.js';

// GLOBAL COMPONENTS
import Number from 'core/tools/Number';

// LOCAL COMPONENTS
import Page from 'parts/page/Page';
import Table from '../parts/Table';

// MAIN COMPONENT
export default compose(
  withRouter
)(({
  rows = [{}, {}, {}],
  // REACT ROUTER
  match: {
    params: {
      recordID
    }
  }
}) => (
  <Page.Module>
    <Page.Module.Header>Initial IMV after Pricing Strategy</Page.Module.Header>
    <Table
      lookupArgs={{
//        endpoint: ENDPOINTS.vehicle.IMVPricing.initial(recordID),
        key: 'initialIMVAfterAddsDeductsStrategy'
      }}
    >
      <Table.Header>
        <Table.Label>IMV Price</Table.Label>
        <Table.Label>IMV Label</Table.Label>
        <Table.Label hide>Initial $ <br />Adjustment</Table.Label>
        <Table.Label hide>$ After <br />Strategy</Table.Label>
        <Table.Label hide>Label After <br />Strategy</Table.Label>
        <Table.Label hide>$ Above / <br />Below IMV</Table.Label>
        <Table.Label hide>% Above / <br />Below IMV</Table.Label>
      </Table.Header>
      <Table.Body>
        {Array.isArray(rows) && rows.map((props = {}, i) => (
          <Table.Row key={i}>
            <Table.Column>
              <Number
                value={props.imv_price}
                schema="dollars"
              />
            </Table.Column>
            <Table.Column>
              {props.imv_label}
            </Table.Column>
            <Table.Column hide>
              <Number
                value={props.initial_adjustment_amount}
                schema="dollars"
              />
            </Table.Column>
            <Table.Column hide>
              <Number
                value={props.amount_after_stratedy}
                schema="dollars"
              />
            </Table.Column>
            <Table.Column hide>
              {props.label_after_strategy}
            </Table.Column>
            <Table.Column hide>
              <Number
                value={props.amount_above_below_imv}
                schema="dollars"
              />
            </Table.Column>
            <Table.Column hide>
              <Number
                value={props.percent_above_below_imv}
                schema="percent"
              />
            </Table.Column>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </Page.Module>
))
