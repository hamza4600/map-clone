import React, { cloneElement } from 'react';

// STYLES
import styles from './header.module.scss';

// MAIN COMPONENT
const Header = ({
  title,
  tools
}) => (
  <div className={styles.header}>
    <h2 className={styles.title}>{title}</h2>
    {!!tools &&
      <div className={styles.tools}>
        {tools.map((tool, i) => cloneElement(tool, {
          key: i
        }))}
      </div>
    }
  </div>
)

// EXPORT
export default Header;
