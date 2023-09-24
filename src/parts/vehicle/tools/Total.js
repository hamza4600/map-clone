import React from 'react';

// LOCAL COMPONENTS
import Adjustment from './Adjustment';

// STYLES
import styles from './total.module.scss';

// MAIN COMPONENT
export default ({
  adjustment,
  variant,
  label
}) => (
  <Adjustment
    className={styles.total}
    variant={variant}
    values={adjustment}
  >
    <h3 className={styles.header}>{label}</h3>
  </Adjustment>
)
