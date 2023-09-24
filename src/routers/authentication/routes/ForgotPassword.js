import React from 'react';

// DEPENDENCIES
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// FUNCTIONS
import { getPath } from 'functions.js';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import Card from '../parts/Card';
import Footer from '../parts/Footer';

// MAIN COMPONENT
export default compose(
  withRouter
)(({
  // REACT ROUTER
  history
}) => (
  <Card
    documentTitle="Forgot Password"
    title="Forgot password?"
    message="Enter the email address associated with your account."
    args={{
      endpoint: ENDPOINTS.session.forgotPassword,
      onSuccess: () => history.push({
        pathname: getPath('login'),
        state: {
          alerts: [
            {
              variant: 'success',
              message: 'Request sent. An email will be sent shortly to the entered address.'
            }
          ]
        }
      }),
      loadingMessage: 'Sending request',
      errorMessage: 'Unable to send request.'
    }}
  >
    <Form.Body>
      <Form.Control name="login" label="Email" type="email" required autoComplete={true} />
    </Form.Body>
    <Footer />
  </Card>
))
