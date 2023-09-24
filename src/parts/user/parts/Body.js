import React from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL COMPONENTS
import Page from 'parts/page/Page';
import Record from 'parts/record/Record';

// MAIN COMPONENT
export default compose(
  connect(
    ({ user }) => ({ user })
  )
)(({
  children,
  title,
  // REDUX STATE
  user,
  // REST
  ...props
}) => (
  <Page.Body>
    <Record.Form
      {...props}
      initialValues={user}
      method="PUT"
    >
      <Page.Card
        title={title}
      >
        <Page.Module>
          {children}
        </Page.Module>
      </Page.Card>
      <Record.Form.Footer>
        <Record.Button.Cancel />
        <Record.Button.Save />
      </Record.Form.Footer>
    </Record.Form>
  </Page.Body>
))
