import React from 'react';

// LOCAL COMPONENTS
import DealershipList from './DealershipList';
import DealershipToggle from './DealershipToggle';
import HeaderDropdown from '../parts/HeaderDropdown';

// MAIN COMPONENT
const DealershipDropdown = () => (
  <HeaderDropdown
    toggle={{
      as: DealershipToggle
    }}
  >
    <DealershipList />
  </HeaderDropdown>
)

export default DealershipDropdown
