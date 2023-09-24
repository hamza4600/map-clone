import React, { useMemo } from 'react';

// DEPENDENCIES
import { findKey } from 'lodash';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';
import { DELIVERY_METHODS } from 'globals.js';

// FUNCTIONS
import { sessionActions } from 'actions.js';
import { alertFunctions, apiFetch, formatFunctions } from 'functions.js';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import Card from '../parts/Card';
import Footer from '../parts/Footer';

// MAIN COMPONENT
export default compose(
  withRouter,
  connect(
    ({ user }) => ({ user }),
    { ...sessionActions }
  )
)(({
  // REACT ROUTER
  history,
  location,
  // REDUX STATE
  user,
  // REDUX DISPATCH
  setVerification
}) => {

  const contactMethod = useMemo(
    () => findKey(DELIVERY_METHODS, el => el === queryString.parse(location.search).delivery_method),
    [location.search]
  )

  const contactInfo = useMemo(
    () => {

      if (!contactMethod) return '';

      const contactInfo = {
        text: user.cell_phone,
        email: user.email_address
      }

      return formatFunctions.hide[contactMethod](contactInfo[contactMethod])
    },
    [contactMethod, user]
  )

  return (
    <Card
      documentTitle="Security Code"
      title="One-time security code"
      message={[
        `We have sent ${contactMethod === 'email' ? 'an' : 'a'} ${contactMethod} with one-time security code to ${contactInfo}. Once you receive the message, enter the security code and click “Submit”.`,
        `Please note that the ${contactMethod} can take a few minutes to be received.`
      ]}
      args={{
        endpoint: ENDPOINTS.session.enterCode,
        onSuccess: setVerification,
        loadingMessage: 'Submitting one-time security code',
        errorMessage: 'Could not authenticate one-time security code.'
      }}
    >
      <Form.Body.Vertical>
        <Form.Control
          name="security_code"
          append={{
            use: 'lock'
          }}
          required
        />
        <Form.Text>
          <Button.Link
            variant="accent"
            label="Re-send one-time security code"
            icon="refresh-cw"
            onClick={() => {
              apiFetch({
                method: 'POST',
                endpoint: ENDPOINTS.session.requestCode,
                params: {
                  delivery_method: queryString.parse(location.search).delivery_method
                },
                loadingMessage: 'Requesting one-time security code',
                successMessage: 'One-time security code re-sent.',
                errorMessage: 'Could not request one-time security code.',
                messageFunctions: alertFunctions
              })
            }}
          />
        </Form.Text>
      </Form.Body.Vertical>
      <Footer />
    </Card>
  )
})
