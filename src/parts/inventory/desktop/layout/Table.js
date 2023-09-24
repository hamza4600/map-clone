import React from 'react';

// LOCAL COMPONENTS
import SummaryColumn from './SummaryColumn';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

// STYLES
import styles from './table.module.scss';

// MAIN COMPONENT
export default () => (
  <div className={styles.table}>
    <SummaryColumn />
    <div className={styles.main}>
      <TableHeader />
      <TableBody />
    </div>
  </div>
)
