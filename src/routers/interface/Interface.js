import React, { Fragment, useMemo } from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { USER_ROLES } from 'globals.js';

// GLOBAL HELPERS
import { sessionTimer } from './helpers/sessionTimer';

// CORE COMPONENTS
import Modal from 'core/tools/modal/Modal';

// ROUTES
import StoreAdmin from './routes/admin/StoreAdmin';
import SysAdmin from './routes/admin/SysAdmin';
import Pricing from './routes/pricing/Pricing';

// MAIN COMPONENT
const Interface = compose(
  sessionTimer,
  connect(
    ({ user }) => ({ user })
  )
)(({
  // REDUX STATE
  user
}) => {

  // MEMOS
  const Router = useMemo(
    () => {
      switch(user.role_key) {
        case USER_ROLES.user.key:       return Pricing;
        case USER_ROLES.storeAdmin.key: return StoreAdmin;
        case USER_ROLES.sysAdmin.key:   return SysAdmin;
        case USER_ROLES.master.key:     return SysAdmin;
        default:                        return Fragment;
      }
    },
    [user.role_key]
  )

  // RENDER
  return (<>
    <Router />
    <Modal.Router />
  </>)
})


// EXPORT
export default Interface;
