import React from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { compose } from 'redux';

// HELPERS
import { getGroup } from '../helpers/getGroup';

// GLOBAL COMPONENTS
import Collapse from 'tools/Collapse';

// LOCAL COMPONENTS
import FilterHeader from './FilterHeader';
import FilterChecklist from '../form/FilterChecklist';

// STYLES
import styles from '../filters.module.scss';

// MAIN COMPONENT
export default compose(
  getGroup,
  connect(
    ({ sidebar }) => ({ disabled: !sidebar })
  )
)(({
  disabled,
  ...props
}) => {

  // PROPS
  const {
    groupKey,
    searchedColumns = []
  } = props;

  // RENDER
  return (
    <div className={styles.container}>
      <Collapse
        id={groupKey}
        className={styles.collapse}
        header={headerProps => <FilterHeader {...props} {...headerProps} />}
        disabled={disabled || searchedColumns.length < 1}
        useChevron
      >
        <FilterChecklist {...props} />
      </Collapse>
    </div>
  )
})
