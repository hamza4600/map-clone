import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// BOOTSTRAP COMPONENTS
import { Nav } from 'react-bootstrap';

// STYLES
import styles from './menuNav.module.scss';

// MAIN COMPONENT
export default ({
  children,
  className
}) => (
  <Nav
    className={clsx(
      styles.nav,
      className
    )}
    defaultActiveKey={undefined}
  >
    {children}
  </Nav>
)
