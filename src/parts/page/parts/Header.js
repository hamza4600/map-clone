import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL COMPONENTS
import Sprite from 'core/tools/Sprite';

// STYLES
import styles from './header.module.scss';

// MAIN COMPONENT
const Header = ({
  children,
  className
}) => (
  <header
    id="page-header"
    className={clsx(
      styles.header,
      className
    )}
  >
    <div className={clsx(
      styles.container
    )}>
      {children}
    </div>
  </header>
)

Header.Title = ({
  children
}) => (
  <span className={styles.title}>{children}</span>
)

Header.Divider = () => (
  <hr className={styles.divider} />
)

Header.Break = () => (
  <div className={styles.break} />
)

Header.Label = ({ children }) => (
  <label className={styles.label}>{children}</label>
)

Header.Sprite = props => (
  <Sprite {...props} className={styles.sprite} />
)

export default Header;
