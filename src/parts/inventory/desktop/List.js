import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { connect } from 'react-redux';
import { compose } from 'redux';

// FUNCTIONS
import { toggleSidebar } from 'actions.js';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Page from 'parts/page/Page';

// LOCAL COMPONENTS
import Table from './layout/Table';
import Pagination from '../tools/Pagination';

// STYLES
import styles from './list.module.scss';

// MAIN COMPONENT
export default compose(
  connect(
    null,
    { toggleSidebar }
  )
)(({
  className,
  toggleSidebar
}) => (
  <Page.Index className={clsx(
    styles.index,
    className
  )}>
    <Button
      className={styles.columnButton}
      variant="accent"
      icon="filter"
      onClick={() => toggleSidebar()}
    />
    <Table />
    <Pagination />
  </Page.Index>
))
