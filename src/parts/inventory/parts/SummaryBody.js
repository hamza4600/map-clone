import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { PATHNAMES } from 'pathnames.js';

// FUNCTIONS
import { makePath } from 'functions.js';

// REACT ROUTER COMPONENTS
import { Link } from 'react-router-dom';

// BOOTSTRAP COMPONENTS
import { Accordion } from 'react-bootstrap';

// CORE COMPONENTS
import Button from 'core/tools/Button';
import Number from 'core/tools/Number';

// STYLES
import styles from './summaryBody.module.scss';

// MAIN COMPONENT
export default compose(
  connect(
    ({ mobile }) => ({ mobile })
  )
)(({
  className,
  number,
  active,
  record: {
    vehicle_id,
    vehicle_info = {}
  } = {},
  // REDUX STATE
  mobile,
  dispatch,
  // REST
  ...props
}) => (
  <div
    className={clsx(
      styles.container,
      className
    )}
    {...props}
  >
    <Link
      to={makePath(PATHNAMES.viewVehicle, vehicle_id)}
      className={styles.body}
    >
      <div>
        <div>{number}</div>
        <div className="text-truncate">{vehicle_info.year} {vehicle_info.make} {vehicle_info.model}</div>
      </div>
      <div>
        <div className="text-primary">#{vehicle_info.stock_no}</div>
        <div><Number schema="miles">{vehicle_info.mileage}</Number> miles</div>
      </div>
    </Link>
    {!!mobile &&
      <Accordion.Toggle
        as={Button.Link}
        className={clsx(
          styles.toggle,
          active && 'active'
        )}
        label={active ? 'View Less' : 'View More'}
        sprite={{
          use: active ? 'chevron-up' : 'chevron-down',
          order: 2
        }}
        size="sm"
        eventKey={number}
      />
    }
  </div>
))
