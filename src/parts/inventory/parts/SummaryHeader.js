import React, { useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { kebabCase } from 'lodash';
import { withRouter } from 'react-router';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { VEHICLE_ISSUES, VEHICLE_RANGES } from 'globals.js';

// DEPENDENCIES
import FullRow from './FullRow';
import TableGroupHeader from './TableGroupHeader';

// STYLES
import styles from './summaryHeader.module.scss';

// MAIN COMPONENT
export default compose(
  withRouter
)(({
  className,
  // REACT ROUTER
  match: {
    params: {
      filter,
      range
    }
  }
}) => {

  // MEMOS
  const title = useMemo(
    () => {
      const filterObject = VEHICLE_ISSUES.filter(({ label }) => kebabCase(label) === filter)[0];
      const rangeObject = VEHICLE_RANGES.filter(({ label }) => label === range)[0];
      return filterObject ? filterObject.label : rangeObject ? `${rangeObject.label} Days` : 'All Inventory';
    },
    [filter, range]
  )

  // RENDER
  return (
    <TableGroupHeader title={title} className={clsx(
      styles.header,
      className
    )}>
      <FullRow className={styles.subHeaders}>
        <span className={styles.span}>#</span>
        <span className={styles.span}>Year</span>
        <span className={styles.span}>Make</span>
        <span className={styles.span}>Model</span>
      </FullRow>
    </TableGroupHeader>
  )
})
