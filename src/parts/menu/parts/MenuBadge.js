import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL COMPONENTS
import Badge from 'tools/Badge';

// STYLES
import styles from './menuBadge.module.scss';

// MAIN COMPONENT
export default ({
  children,
  className
}) => (
  <Badge
    className={clsx(
      styles.badge,
      className
    )}
    pill
    loader
  >
    {children}
  </Badge>
)
