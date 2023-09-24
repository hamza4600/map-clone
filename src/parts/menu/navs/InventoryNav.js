import React from 'react';

// DEPENDENCIES
import { kebabCase } from 'lodash';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { VEHICLE_ISSUES, VEHICLE_RANGES } from 'globals.js';
import { PATHNAMES } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// HELPERS
import { getInventorySummary } from '../helpers/getInventorySummary';

// ROUTER COMPONENTS
import { NavLink } from 'react-router-dom';

// BOOTSTRAP COMPONENTS
import { Collapse, Nav } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Scrollbox from 'core/tools/Scrollbox';

// LOCAL COMPONENTS
import Menu from '../Menu';

// STYLES
import styles from './inventoryNav.module.scss';

// CHILD COMPONENTS
const Item = compose(
  withRouter
)(({
  path,
  label,
  lookup,
  // REACT ROUTER
  location: {
    search
  }
}) => (
  <Menu.Item
    to={`${makePath(PATHNAMES.inventory, path)}${search}`}
  >
    <Menu.Label>{label}</Menu.Label>
    <Menu.Badge>{lookup}</Menu.Badge>
  </Menu.Item>
))

// MAIN COMPONENT
const InventoryNav = compose(
  connect(
    ({ mobile }) => ({ mobile })
  ),
  withRouter,
  getInventorySummary
)(({
  inventorySummary,
  // REDUX STATE
  mobile,
  // REACT ROUTER
  match: {
    params: {
      filter
    }
  }
}) => (<>
  <Menu.Nav className={styles.nav}>
    <Item
      path={PATHNAMES.all}
      label={<>All <Menu.Hidden>Inventory</Menu.Hidden></>}
      lookup={inventorySummary.ALL}
    />
    {!mobile && <>
      {VEHICLE_RANGES.map((range, i) => (
        <Item
          key={i}
          path={makePath('days', range.label)}
          label={<>{range.label} <Menu.Hidden>days</Menu.Hidden></>}
          lookup={inventorySummary[range.lookup]}
        />
      ))}
      <hr />
    </>}
    {VEHICLE_ISSUES.map(({label, key}, i) => (
      <Item
        key={i}
        path={kebabCase(label)}
        label={label}
        lookup={inventorySummary[key]}
      />
    ))}
  </Menu.Nav>
  {mobile &&
    <Collapse in={!filter}>
      <div>
        <div className={styles.daysContainer}>
          <div className={styles.daysLabel}>Days:</div>
          <Scrollbox
            direction="horizontal"
          >
            <Nav className={styles.daysNav}>
              {VEHICLE_RANGES.map((range, i) => (
                <Nav.Item
                  key={i}
                  className={styles.daysItem}
                >
                  <Nav.Link
                    as={NavLink}
                    className={styles.daysLink}
                    to={makePath(PATHNAMES.inventory, 'days', range.label)}
                  >
                    {range.label} days
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Scrollbox>
        </div>
      </div>
    </Collapse>
  }
</>))

// EXPORT
export default InventoryNav;
