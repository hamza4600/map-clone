import React from 'react';

// GLOBAL VARIBALES
import { ENDPOINTS } from 'endpoints.js';
import { PATHNAMES } from 'pathnames.js';

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
    title="Change Password"
    endpoint={ENDPOINTS.user.password}
    loadingMessage="Updating your password"
    errorMessage="Unable to update your password."
    successRedirect={PATHNAMES.profile}
  >
    <Form.Body>
      <Form.Control
        name="current_password"
        label="Current Password"
        type="password"
        required
      />
      <Form.Control
        name="new_password"
        label="New Password"
        type="password"
        schema="passkey"
        required
        confirmed
      />
    </Form.Body>
  </User>
)
