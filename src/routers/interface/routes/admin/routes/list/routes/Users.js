import React from 'react';

// GLOBAL VARIBALES
import { ENDPOINTS } from 'endpoints.js';

// GLOBAL COMPONENTS
import List from 'parts/list/List';
const { Action, Button, Col } = List;

// LOCAL VARIABLES
const PROPS = {
  title:    'Users',
  label:    'user',
  idKey:    'user_account_id',
  endpoint: ENDPOINTS.admin.users
}
const HEADER = {
  tools: [
    <Button.Add />
  ]
}
const COLUMNS = ({
  name,
  username,
  user_role,
  email_address,
}) => [
  <Col
    label="Name"
    children={name}
    cols={{
      md: 5
    }}
  />,
  <Col
    label="Username"
    children={username}
    cols={{
      md: 5
    }}
  />,
  <Col
    label="Role"
    children={user_role}
    cols={{
      md: 5
    }}
  />,
  <Col
    label="Email"
    children={email_address}
    cols={{
      md: 9
    }}
  />
]
const ACTIONS = () => [
  <Action.Edit />
]

// MAIN COMPONENT
const Users = () => (
  <List
    {...PROPS}
    header={HEADER}
    columns={COLUMNS}
    actions={ACTIONS}
  />
)

// EXPORT
export default Users
