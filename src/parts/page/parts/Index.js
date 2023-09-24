import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// STYLES
import styles from './index.module.scss';

// MAIN COMPONENT
export default ({
  children,
  className
}) => (
  <div className={clsx(
    styles.body,
    className
  )}>
    {children}
  </div>
)
