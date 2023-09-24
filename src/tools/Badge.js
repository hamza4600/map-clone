import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// BOOTSTRAP COMPONENTS
import { Badge } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Sprite from 'core/tools/Sprite';

// STYLES
import styles from './badge.module.scss';

// MAIN COMPONENT
export default ({
  children,
  className,
  variant,
  loader
}) => children === undefined ? loader ? <Sprite.Loader /> : null : (
  <Badge
    variant={variant}
    className={clsx(
      styles.badge,
      styles[variant],
      className
    )}
    pill
  >
    {children}
  </Badge>
)
