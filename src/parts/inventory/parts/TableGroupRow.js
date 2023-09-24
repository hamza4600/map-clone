import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// STYLES
import styles from './tableGroupRow.module.scss';

// MAIN COMPONENT
export default ({
  children,
  className,
  display = true,
}) => (
  <div
    className={clsx(
      styles.row,
      display ? 'd-flex' : 'd-none', // Bootstrap Class
      className
    )}
  >
    {children}
  </div>
)
