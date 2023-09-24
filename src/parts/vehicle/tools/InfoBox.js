import React from 'react';

// STYLES
import styles from './infoBox.module.scss';

// MAIN COMPONENT
const Component = ({
  children,
  title
}) => (
  <div className={styles.infoBox}>
    <h4>{title}</h4>
    <dl>
      {children}
    </dl>
  </div>
)

Component.Item = ({
  children,
  label
}) => (
  <>
    <dt>{label}</dt>
    <dd>{children}</dd>
  </>
)

export default Component;
