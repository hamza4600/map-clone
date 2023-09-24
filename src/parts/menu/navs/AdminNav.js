import React from 'react';

// DEPENDENCIES
import { connect } from 'react-redux'
import { compose } from 'redux';

// GLOBAL VARIABLES
import { USER_ROLES } from 'globals.js';
import { PATHNAMES } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// GLOBAL COMPONENTS
import Sprite from 'core/tools/Sprite';

// LOCAL COMPONENTS
import Menu from '../Menu';

// STYLES
import styles from './adminNav.module.scss';

// CHILD COMPONENTS
const Item = ({
  path,
  label,
  icon,
}) => (
  <Menu.Item
    className={styles.item}
    linkClassName={styles.link}
    to={makePath(path)}
  >
    <div className={styles.container}>
      <Sprite
        className={styles.sprite}
        use={icon}
      />
      <Menu.Label className={styles.label}>{label}</Menu.Label>
    </div>
  </Menu.Item>
)

// MAIN COMPONENT
const UpdateVehicleNav = compose(
  connect(
    ({ mobile, user }) => ({ mobile, user })
  )
)(({
  // REDUX STATE
  mobile,
  user
}) => mobile ? null : (
  <Menu.Nav className={styles.nav}>
    {user.role_key === USER_ROLES.sysAdmin.key && <>
      <Item
        path={PATHNAMES.users}
        label="Users"
        icon="users"
      />
    </>}
  </Menu.Nav>
))

// EXPORT
export default UpdateVehicleNav;
