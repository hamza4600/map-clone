import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// ROUTER COMPONENTS
import { NavLink } from 'react-router-dom';

// BOOTSTRAP COMPONENTS
import { Nav } from 'react-bootstrap';

// STYLES
import styles from './menuItem.module.scss';

// MAIN COMPONENT
export default ({
  children,
  as = NavLink,
  className,
  linkClassName,
  to = as === NavLink ? '#' : undefined,
  onClick,
  disabled
}) => (
  <Nav.Item className={clsx(
    styles.item,
    className
  )}>
    <Nav.Link
      as={as}
      className={clsx(
        styles.link,
        disabled && styles.disabled,
        linkClassName
      )}
      to={to}
      onClick={onClick}
    >
      {children}
    </Nav.Link>
  </Nav.Item>
)
