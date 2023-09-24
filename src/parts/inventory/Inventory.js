import React from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { compose } from 'redux';

// HELPERS
import { inventoryContext } from './helpers/inventoryContext';

// GLOBAL COMPONENTS
import Filters from 'parts/sidebar/sidebars/filters/Filters';

// LOCAL COMPONENTS
import DesktopList from './desktop/List';
import MobileList from './mobile/List';

// MAIN COMPONENT
export default compose(
  inventoryContext,
  connect(
    ({ mobile }) => ({ mobile })
  )
)(({
  mobile
}) => (
  <>
    {mobile ? (
      <MobileList />
    ) : (
      <DesktopList />
    )}
    <Filters />
  </>
))
