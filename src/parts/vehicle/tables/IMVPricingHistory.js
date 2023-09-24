import React from 'react';

// GLOBAL COMPONENTS
import Number from 'core/tools/Number';
import YesNo from 'tools/YesNo';

// LOCAL COMPONENTS
import Page from 'parts/page/Page';
import Table from '../parts/Table';

// MAIN COMPONENT
export default ({
  rows = [{}, {}, {}],
}) => (
  <Page.Module>
    <Table>
      <Table.Header>
        <Table.Label>Date</Table.Label>
        <Table.Label>User</Table.Label>
        <Table.Label>IMV CPO</Table.Label>
        <Table.Label hide>Great Price</Table.Label>
        <Table.Label hide>Good Price</Table.Label>
        <Table.Label hide>Fair Price</Table.Label>
        <Table.Label hide>Proof</Table.Label>
        <Table.Label hide>URL 1</Table.Label>
        <Table.Label hide>URL 2</Table.Label>
      </Table.Header>
      <Table.Body>
        {Array.isArray(rows) && rows.map((props = {}, i) => (
          <Table.Row key={i}>
            <Table.Column>
              <Number
                value={props.date}
                format="date"
              />
            </Table.Column>
            <Table.Column>
              {props.user}
            </Table.Column>
            <Table.Column>
              <YesNo
                value={props.cpo}
              />
            </Table.Column>
            <Table.Column hide>
              <Number
                value={props.great}
                schema="dollars"
              />
            </Table.Column>
            <Table.Column hide>
              <Number
                value={props.good}
                schema="dollars"
              />
            </Table.Column>
            <Table.Column hide>
              <Number
                value={props.fair}
                schema="dollars"
              />
            </Table.Column>
            <Table.Column hide>
              <Table.Link>View</Table.Link>
            </Table.Column>
            <Table.Column hide>
              <Table.Link>View</Table.Link>
            </Table.Column>
            <Table.Column hide>
              <Table.Link>View</Table.Link>
            </Table.Column>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </Page.Module>
)
