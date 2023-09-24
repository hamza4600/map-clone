import React from 'react';

// DEPENDENCIES
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';
import { USER_ROLES } from 'globals.js';
import { PATHNAMES } from 'pathnames.js';

// CORE COMPONENTS
import Form from 'core/form/Form';

// GLOBAL COMPONENTS
import Page from 'parts/page/Page';
import Record from 'parts/record/Record';

// MAIN COMPONENT
const Users = compose(
  connect(
    ({ user }) => ({ user })
  ),
  withRouter
)(({
  // REDUX
  user,
  // REACT ROUTER
  match: {
    params: {
      recordID
    }
  }
}) => (
  <Record
    label="user"
    idKey="user_account_id"
    documentTitle="Users"
    endpoint={ENDPOINTS.admin.users}
  >
    <Record.Body>
      <Record.Form
        args={{
          endpoint: ENDPOINTS.admin.users
        }}
        redirect={PATHNAMES.users}
      >
        <Record.Card>
          <Page.Module>
            <Form.Body>
              <Form.Control
                name="username"
                label="Username"
                required={!recordID}
                plaintext={!!recordID}
              />
              <Form.Control
                name={recordID ? 'new_password' : 'password'}
                label={recordID ? 'New Password' : 'Password'}
                type="password"
                schema="passkey"
                confirmed
                required={!recordID}
              />
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
              {user.role_key === USER_ROLES.sysAdmin.key && <>
                <Form.Checklist
                  name="dealership_store_id"
                  label="Dealership(s)"
                  options={user.stores.map(store => ({
                    label: store.store_name,
                    value: store.dealership_store_id
                  }))}
                  list={{
                    direction: 'vertical'
                  }}
                />
              </>}
              <Form.Select
                name="user_account_role_id"
                label="User Role"
                lookup="userRole"
                optionKeys={{
                  label: 'role',
                  value: 'user_account_role_id'
                }}
                required
              />
            </Form.Body>
          </Page.Module>
        </Record.Card>
        <Record.Footer />
      </Record.Form>
    </Record.Body>
  </Record>
))

export default Users
