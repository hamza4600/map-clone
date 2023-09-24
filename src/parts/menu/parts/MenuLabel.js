import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// STYLES
import styles from './menuLabel.module.scss';

// MAIN COMPONENT
export default ({
  children,
  className
}) => (
  <span
    className={clsx(
      styles.label,
      className
    )}
  >
    {children}
  </span>
)
