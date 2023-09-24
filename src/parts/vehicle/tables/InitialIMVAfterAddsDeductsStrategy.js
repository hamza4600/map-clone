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
    <Page.Module.Header>Initial IMV after Additions / <br className="d-lg-none" />Deductions & Pricing Strategy</Page.Module.Header>
    <Table
      lookupArgs={{
//        endpoint: ENDPOINTS.vehicle.IMVPricing.initial(recordID),
        key: 'initialIMVAfterPricingStrategy'
      }}
    >
      <Table.Header>
        <Table.Label>IMV Price</Table.Label>
        <Table.Label>IMV Label</Table.Label>
        <Table.Label hide>Additions / <br />Deductions</Table.Label>
        <Table.Label hide>Initial $ <br />Adjustment</Table.Label>
        <Table.Label hide>Net Price</Table.Label>
        <Table.Label hide>Net Price <br />IMV Label</Table.Label>
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
                value={props.additions_deductions}
                schema="dollars"
              />
            </Table.Column>
            <Table.Column hide>
              <Number
                value={props.initial_adjustment_amount}
                schema="dollars"
              />
            </Table.Column>
            <Table.Column hide>
              <Number
                value={props.net_price}
                schema="dollars"
              />
            </Table.Column>
            <Table.Column hide>
              {props.net_price_imv_label}
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
