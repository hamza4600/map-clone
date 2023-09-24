import React from 'react';

// GLOBAL VARIBALES
import { ENDPOINTS } from 'endpoints.js';

// CORE COMPONENTS
import Form from 'core/form/Form';

// GLOBAL COMPONENTS
import User from 'parts/user/User';

// MAIN COMPONENT
export default ({
  user,
  ...props
}) => (
  <User
    title="My Account"
    endpoint={ENDPOINTS.user.profile}
    loadingMessage="Updating your account"
    errorMessage="Unable to update your account."
  >
    <Form.Body.Columns>
      <Form.Control
        name="first_name"
        label="First Name"
        required
      />
      <Form.Control
        name="last_name"
        label="Last Name"
        required
      />
      <Form.Control
        name="email_address"
        label="Email Address"
        type="email"
        required
      />
      <Form.Control
        name="cell_phone"
        label="Cell Phone"
        schema="tel"
        required
      />
    </Form.Body.Columns>
  </User>
)
