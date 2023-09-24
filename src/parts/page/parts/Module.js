import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// STYLES
import styles from './module.module.scss';

// MAIN COMPONENT
const Component = ({
  children,
  className,
  title
}) => (
  <div className={clsx(
    className,
    styles.module
  )}>
    {children}
  </div>
)

Component.Header = ({ className, children }) => <h3 className={clsx(styles.header, className)}>{children}</h3>

Component.Subheader = ({ className, children }) => <h5 className={clsx(styles.subheader, className)}>{children}</h5>

Component.Divider = ({ className, vertical }) => <hr className={clsx(styles.divider, !!vertical && styles.vertical, className)} />

Component.Spacer = ({ className }) => <div className={clsx(styles.spacer, className)}></div>

export default Component;
