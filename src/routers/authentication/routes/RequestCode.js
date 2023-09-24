import React, { useMemo, useState } from 'react';

// DEPENDENCIES
import queryString from 'query-string';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';
import { DELIVERY_METHODS } from 'globals.js';

// FUNCTIONS
import { formatFunctions, getPath } from 'functions.js';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import Card from '../parts/Card';
import Footer from '../parts/Footer';

// MAIN COMPONENT
export default compose(
  withRouter,
  connect(
    ({ user }) => ({ user })
  )
)(({
  // REACT ROUTER
  history,
  // REDUX STATE
  user
}) => {

  const [ deliveryMethod, setMethod ] = useState(undefined);

  const phone = useMemo(
    () => formatFunctions.hide.phone(user.cell_phone),
    [user]
  )

  const email = useMemo(
    () => formatFunctions.hide.email(user.email_address),
    [user]
  )

  return (
    <Card
      documentTitle="Security Code"
      title="One-time security code"
      message="Select a delivery method for your one-time security code to access MAPA."
      args={{
        endpoint: ENDPOINTS.session.requestCode,
        onSuccess: () => history.push({
          pathname: getPath('enterCode'),
          search: queryString.stringify({
            delivery_method: deliveryMethod
          })
        }),
        loadingMessage: 'Requesting one-time security code',
        errorMessage: 'Unable to request one-time security code.',
      }}
    >
      <Form.Body.Vertical>
        <Form.Checklist
          type="radio"
          name="delivery_method"
          options={[
            {
              value: DELIVERY_METHODS.text,
              label: `Text me at ${phone}`
            },
            {
              value: DELIVERY_METHODS.email,
              label: `Email me at ${email}`
            }
          ]}
          list={{
            direction: 'vertical'
          }}
          onChange={e => setMethod(e.target.value)}
          required
        />
      </Form.Body.Vertical>
      <Footer submitLabel="Request Code" />
    </Card>
  )
})
