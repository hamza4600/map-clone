import React, { useCallback, useState } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { USER_ROLES } from 'globals.js';
import { PATHNAMES } from 'pathnames.js';

// FUNCTIONS
import { logOut, makePath } from 'functions.js';

// BOOTSTRAP COMPONENTS
import { ListGroup } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// LOCAL COMPONENTS
import HeaderDropdown from '../parts/HeaderDropdown';

// STYLES
import styles from './menuDropdown.module.scss';

// CHILD COMPONENTS
const MenuItem = ({
  className,
  path,
  icon,
  ...props
}) => (
  <ListGroup.Item
    as={Button}
    className={clsx(
      styles.item,
      className
    )}
    variant="custom"
    to={path}
    sprite={{
      use: icon,
      order: 1
    }}
    round={false}
    {...props}
  />
)

// MAIN COMPONENT
const MenuDropdown = compose(
  connect(
    ({ mobile, user }) => ({ mobile, user })
  )
)(({
  // REDUX STATE
  mobile,
  user
}) => {

  // STATE
  const [ active, setActive ] = useState(false);

  // CALLBACKS
  const handleShow = useCallback(
    show => {
      setActive(show)
    },
    [setActive]
  )

  // RENDER
  return (
    <HeaderDropdown
      className={styles.dropdown}
      toggle={{
        icon: active ? 'x' : 'menu',
        square: true
      }}
      onShow={handleShow}
    >
      <ListGroup className={styles.listGroup}>
        {user.role_key === USER_ROLES.user.key &&
          <MenuItem
            path={makePath(PATHNAMES.inventory, 'all')}
            label="Inventory"
            icon="list"
          />
        }
        {mobile && user.role_key === USER_ROLES.sysAdmin.key && <>
          <MenuItem
            path={makePath(PATHNAMES.users)}
            label="Users"
            icon="users"
          />
        </>}
        <MenuItem
          path={makePath(PATHNAMES.changePassword)}
          label="Change Password"
          icon="unlock"
        />
        <MenuItem
          path={makePath(PATHNAMES.profile)}
          label="My Account"
          icon="user"
        />
        <MenuItem
          className={styles.logOut}
          label="Log Out"
          icon="log-out"
          onClick={() => logOut()}
        />
      </ListGroup>
    </HeaderDropdown>
  )
})

export default MenuDropdown
