import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// STYLES
import styles from './fullRow.module.scss';

// MAIN COMPONENT
export default ({
  children,
  className
}) => (
  <div className={clsx(
    styles.row,
    className
  )}>
    {children}
  </div>
)
