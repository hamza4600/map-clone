import React from 'react';

// DEPENDENCIES
import { compose } from 'redux';
import { connect } from 'react-redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// FUNCTIONS
import { sessionActions } from 'actions.js';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import Card from '../parts/Card';
import Footer from '../parts/Footer';

// MAIN COMPONENT
export default compose(
  connect(
    ({ user }) => ({ user }),
    { ...sessionActions }
  )
)(({
  user: {
    stores = []
  },
  setDealership
}) => (
  <Card
    documentTitle="Choose Store"
    title="Choose a store"
    message="Please choose a store you would like to access."
    args={{
      endpoint: ENDPOINTS.session.chooseStore,
      onSuccess: setDealership,
      loadingMessage: 'Submitting dealership choice',
      errorMessage: 'Unable to submit dealership choice.'
    }}
  >
    <Form.Body.Vertical>
      <Form.Select
        name="dealership_store_id"
        label="Store"
        placeholder="Select"
        options={stores.map(({
          dealership_store_id,
          store_name
        }) => ({
          label: store_name,
          value: dealership_store_id
        }))}
        required
        useDefault
      />
    </Form.Body.Vertical>
    <Footer submitLabel="Enter" />
  </Card>
))
