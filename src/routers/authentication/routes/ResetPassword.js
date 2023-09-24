import React from 'react';

// DEPENDENCIES
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// FUNCTIONS
import { getPath } from 'functions.js';

// LOCAL HELPERS
import { checkToken } from '../helpers/checkToken';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import Card from '../parts/Card';
import Footer from '../parts/Footer';

// MAIN COMPONENT
export default compose(
  checkToken,
  withRouter
)(({
  // REACT ROUTER
  history,
  match: {
    params: {
      token
    }
  }
}) => (
  <Card
    documentTitle="Reset Password"
    title="Reset password?"
    message="Please set a new password."
    args={{
      initialValues: {
        token
      },
      endpoint: ENDPOINTS.session.newPassword,
      onSuccess: () => history.push({
        pathname: getPath('login'),
        state: {
          alerts: [
            {
              variant: 'success',
              message: 'Password has been successfully reset.'
            }
          ]
        }
      }),
      loadingMessage: 'Resetting password',
      errorMessage: 'Unable to reset password.'
    }}
  >
    <Form.Body.Vertical>
      <Form.Hidden
        name="token"
      />
      <Form.Control
        name="new_password"
        label="New Password"
        type="password"
        schema="passkey"
        required
        confirmed
      />
    </Form.Body.Vertical>
    <Footer />
  </Card>
))
