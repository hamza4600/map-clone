import React, { useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
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
import styles from './addVehicleNav.module.scss';

// LOCAL VARIABLES
const STEPS = [
  {
    path: PATHNAMES.vehicleInfo,
    label: <>Vehicle <br className="d-lg-none" />Info <Menu.Hidden className="d-none d-lg-block">(Initial Add)</Menu.Hidden></>,
    icon: 'info'
  },
  {
    path: PATHNAMES.entryQuestions,
    label: <>Entry <br className="d-lg-none" />Questions</>,
    icon: 'help-circle'
  },
  {
    path: PATHNAMES.initialIMVPricing,
    label: <>Initial IMV <br className="d-lg-none" />Pricing</>,
    icon: 'percent'
  },
  {
    path: PATHNAMES.pricingStrategy,
    label: <><div className="d-sm-none">Summary &</div>Pricing Strategy</>,
    icon: 'file-text'
  },
  {
    path: PATHNAMES.success,
    label: 'Success!',
    icon: 'check-circle'
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
  // REACT ROUTER
  match
}) => {

  // MEMOS
  const state = useMemo(
    () => {
      const itemKey = STEPS.findIndex(step => step.path === path);
      const currentKey = STEPS.findIndex(step => step.path === match.params.step);

      switch (true) {
        case itemKey === currentKey:
          return 'current';
        case itemKey < currentKey:
          return 'complete';
        default:
          return 'pending';
      }
    },
    [path, match]
  )

  // RENDER
  return (
    <Menu.Item
      as={state === 'pending' ? 'span' : undefined}
      className={styles.item}
      linkClassName={clsx(
        styles.link,
        styles[state]
      )}
      to={makePath(PATHNAMES.addVehicle, path, match.params.recordID)}
      disabled={state === 'pending'}
    >
      {mobile &&
        <Sprite
          className={styles.sprite}
          use={icon}
          size="lg"
        />
      }
      <Menu.Label className={styles.label}>{label}</Menu.Label>
      {!mobile && state !== 'pending' &&
        <Menu.Hidden>
          <Sprite
            use={state === 'current' ? 'loader' : 'check'}
          />
        </Menu.Hidden>
      }
    </Menu.Item>
  )
})

// MAIN COMPONENT
const UpdateVehicleNav = compose(
  connect(
    ({ mobile }) => ({ mobile })
  )
)(({
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
