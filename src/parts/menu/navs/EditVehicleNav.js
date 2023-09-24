import React from 'react';

// DEPENDENCIES
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { PATHNAMES } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// GLOBAL COMPONENTS
import Scrollbox from 'core/tools/Scrollbox';
import Sprite from 'core/tools/Sprite';

// LOCAL COMPONENTS
import Menu from '../Menu';

// STYLES
import styles from './editVehicleNav.module.scss';

// LOCAL VARIABLES
const STEPS = [
  {
    path:  PATHNAMES.vehicleInfo,
    label: 'Vehicle Info',
    icon:  'info'
  },
  {
    path:  PATHNAMES.entryQuestions,
    label: 'Entry Questions',
    icon:  'help-circle'
  }
]

// CHILD COMPONENTS
const Item = compose(
  connect(
    ({ mobile }) => ({ mobile })
  ),
  withRouter
)(({
  path,
  label,
  icon,
  // REDUX STATE
  mobile,
  //REACT ROUTER
  match
}) => (
  <Menu.Item
    className={styles.item}
    linkClassName={styles.link}
    to={makePath(PATHNAMES.editVehicle, path, match.params.recordID)}
  >
    {mobile &&
      <Sprite
        className={styles.sprite}
        use={icon}
        size="lg"
      />
    }
    <Menu.Label className={styles.label}>{label}</Menu.Label>
  </Menu.Item>
))

// MAIN COMPONENT
const UpdateVehicleNav = compose(
  connect(
    ({ mobile }) => ({ mobile })
  )
)(({
  // REDUX STATE
  mobile
}) => (
  <Scrollbox
    direction="horizontal"
    disabled={!mobile}
  >
    <Menu.Nav className={styles.nav}>
      {STEPS.map((step, i) => (
        <Item
          key={i}
          {...step}
        />
      ))}
    </Menu.Nav>
  </Scrollbox>
))

// EXPORT
export default UpdateVehicleNav;
