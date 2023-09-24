import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL COMPONENTS
import Dropdown from 'core/tools/dropdown/Dropdown';

// LOCAL COMPONENTS
import HeaderButton from './HeaderButton';

// STYLES
import styles from './headerDropdown.module.scss';

// MAIN COMPONENT
const HeaderDropdown = ({
  className,
  toggle = {},
  menu = {},
  ...props
}) => (
  <Dropdown
    className={clsx(
      styles.dropdown,
      className
    )}
    toggle={{
      as: HeaderButton,
      ...toggle
    }}
    menu={{
      className: styles.menu,
      useArrow: false,
      ...menu
    }}
    {...props}
  />
)

export default HeaderDropdown
