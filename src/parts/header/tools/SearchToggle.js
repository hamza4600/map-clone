import React, { useContext } from 'react';

// CONTEXT
import { SearchContext } from '../helpers/searchContext';

// LOCAL COMPONENTS
import HeaderButton from '../parts/HeaderButton';

// MAIN COMPONENT
const SearchToggle = props => {

  // REFS
  const { handleClick } = useContext(SearchContext) || {};

  // RENDER
  return (
    <HeaderButton
      icon="search"
      square
      onClick={handleClick}
    />
  )
}

// EXPORT
export default SearchToggle
