import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// STYLES
import styles from './menuHidden.module.scss';

// MAIN COMPONENT
export default ({
  children,
  className
}) => (
  <span
    className={clsx(
      styles.hidden,
      className
    )}
  >
    {children}
  </span>
)
