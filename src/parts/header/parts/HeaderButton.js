import React, { forwardRef } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './headerButton.module.scss';

// MAIN COMPONENT
const HeaderButton = forwardRef(({
  className,
  ...props
}, ref) => (
  <Button
    className={clsx(
      styles.button,
      props.square && styles.square,
      className
    )}
    variant="primary"
    round={false}
    ref={ref}
    {...props}
  />
))

export default HeaderButton
