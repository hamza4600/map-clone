import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// STYLES
import styles from './body.module.scss';

// MAIN COMPONENT
export default ({
  children,
  className
}) => (
  <div
    id="page-body"
    className={clsx(
      styles.body,
      className
    )}
  >
    {children}
  </div>
)
