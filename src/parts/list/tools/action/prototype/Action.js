import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// CORE COMPONENTS
import Button from 'core/tools/Button';

// GLOBAL COMPONENTS
import Tooltip from 'core/tools/Tooltip';

// STYLES
import styles from './action.module.scss';

// MAIN COMPONENT
export default ({
  className,
  label,
  // REST
  ...props
}) => (
  <Tooltip
    wrapperClassName={styles.tooltip}
    tip={props.disabled ? undefined : label}
  >
    <Button
      className={clsx(
        styles.button,
        className
      )}
      link
      square
      {...props}
    />
  </Tooltip>
)
