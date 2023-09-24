import React, { useContext } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// CONTEXT
import { SearchContext } from '../helpers/searchContext';

// LOCAL COMPONENTS
import SearchForm from './SearchForm';
import SearchToggle from './SearchToggle';

// STYLES
import styles from './searchInline.module.scss';

// MAIN COMPONENT
const SearchInline = () => {

  // REFS
  const { show } = useContext(SearchContext) || {};

  // RENDER
  return (
    <div className={styles.container}>
      <SearchToggle />
      <div className={clsx(
        styles.collapse,
        show && styles.show
      )}>
        <SearchForm />
      </div>
    </div>
  )
}

// EXPORT
export default SearchInline
