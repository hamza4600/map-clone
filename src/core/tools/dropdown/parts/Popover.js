import React, { useContext } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// CONTEXT
import { DropdownContext } from '../helpers/dropdownContext';

// STYLES
import styles from './popover.module.scss';

// MAIN COMPONENT
const Popover = ({
  children,
  className,
  fullWidth,
  ...props
}) => {

  // CONTEXT
  const { show, popoverRef } = useContext(DropdownContext) || {};

  // RENDER
  return (
    <div
      className={clsx(
        'dropdown-popover',
        styles.popover,
        show && styles.show,
        fullWidth && styles.fullWidth,
        className
      )}
      ref={popoverRef}
    >
      {children}
    </div>
  )
}

// EXPORT
export default Popover;
