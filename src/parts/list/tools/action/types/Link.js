import React from 'react';

// DEPENDENCIES
import { compose } from 'redux';
import { withRouter } from 'react-router';

// FUNCTIONS
import { makePath } from 'functions.js';

// LOCAL COMPONENTS
import Action from '../prototype/Action';

// MAIN COMPONENT
export default compose(
  withRouter
)(({
  path,
  record,
  recordID,
  // REACT ROUTER
  history,
  location: {
    pathname
  },
  match,
  // REST
  ...props
}) => (
  <Action
    to={makePath(pathname, path, recordID)}
    {...props}
  />
))
