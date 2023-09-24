import React, { useContext } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { connect } from 'react-redux';
import { compose } from 'redux';

// CONTEXT
import { InventoryContext } from '../helpers/inventoryContext';

// LOCAL COMPONENTS
import PerPage from '../tools/PerPage';

// STYLES
import styles from './summaryFooter.module.scss';

// MAIN COMPONENT
export default compose(
  connect(
    ({ mobile }) => ({ mobile })
  )
)(({
  // REDUX STATE
  mobile,
}) => {

  // CONTEXT
  const {
    params: {
      rowsOnPage
    }
  } = useContext(InventoryContext) || {};

  // RETURN
  return mobile ? null : (
    <div className={clsx(
      styles.footer
    )}>
      <PerPage
        rowsOnPage={rowsOnPage}
      />
    </div>
  )
})
