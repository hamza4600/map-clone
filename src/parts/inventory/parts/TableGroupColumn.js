import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// STYLES
import styles from './tableGroupColumn.module.scss';

// MAIN COMPONENT
export default ({
  children,
  className,
  display = true,
}) => (
  <div
    width="120"
    className={clsx(
      styles.column,
      display ? 'd-flex' : 'd-none', // Bootstrap Class
      className
    )}
  >
    {children}
  </div>
)
