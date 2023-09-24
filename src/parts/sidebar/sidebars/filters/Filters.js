import React from 'react';

// LOCAL COMPONENTS
import Sidebar from '../../Sidebar';
import FilterForm from './form/FilterForm';

// MAIN COMPONENT
export default props => (
  <Sidebar
    {...props}
    id="filters"
    title="Select Columns"
  >
    <FilterForm />
  </Sidebar>
)
