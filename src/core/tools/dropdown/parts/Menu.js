import React, { useContext } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL VARIABLES
import { DROPDOWN } from 'defaults.js';

// CONTEXT
import { DropdownContext } from '../helpers/dropdownContext';

// CORE COMPONENTS
import Scrollbox from 'core/tools/Scrollbox';

// STYLES
import styles from './menu.module.scss';

// MAIN COMPONENT
const Menu = ({
  children,
  className,
  size,
  useArrow = DROPDOWN.useArrow,
  ...props
}) => {

  // CONTEXT
  const { height, innerRef } = useContext(DropdownContext) || {};

  // RENDER
  return (
    <div
      className={clsx(
        'dropdown-menu',
        styles.menu,
        styles[size],
        useArrow && styles.withArrow,
        className
      )}
      ref={innerRef}
    >
      <Scrollbox
        outerStyle={{
          maxHeight: height
        }}
        preventDefault
        disabled
      >
        <div className={clsx(
          'dropdown-menu-inner',
          styles.inner
        )}>
          {children}
        </div>
      </Scrollbox>
    </div>
  )
}

// EXPORT
export default Menu;
