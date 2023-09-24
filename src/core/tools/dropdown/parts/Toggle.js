import React, { useCallback, useContext } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// CONTEXT
import { DropdownContext } from '../helpers/dropdownContext';

// CORE COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './toggle.module.scss';

// MAIN COMPONENT
const Toggle = ({
  as: Component = Button,
  className,
  icon,
  onToggle,
  ...props
}) => {

  // CONTEXT
  const { show, setShow, toggleRef } = useContext(DropdownContext) || {};

  // CALLBACKS
  const handleClick = useCallback(
    () => {
      doCallback(setShow, !show);
      doCallback(onToggle, !show);
    },
    [show, setShow, onToggle]
  )

  // RENDER
  return (
    <Component
      {...props}
      className={clsx(
        'dropdown-toggle',
        styles.toggle,
        show && 'active',
        className
      )}
      icon={icon || (show ? 'chevron-up' : 'chevron-down')}
      onClick={handleClick}
      ref={toggleRef}
    />
  )
}

// EXPORT
export default Toggle;
