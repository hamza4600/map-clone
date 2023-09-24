import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// STYLES
import styles from './tableGroupHeader.module.scss';

// MAIN COMPONENT
export default ({
  children,
  className,
  display = true,
  title
}) => (
  <div className={clsx(
    styles.header,
    display ? 'd-flex' : 'd-none', // Bootstrap Class
    className,
  )}>
    {title &&
      <h2 className={styles.title}>{title}</h2>
    }
    <div className={styles.subHeaders}>
      {children}
    </div>
  </div>
)
