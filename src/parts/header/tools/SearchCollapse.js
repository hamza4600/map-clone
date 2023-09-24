import React, { useContext } from 'react';

// CONTEXT
import { SearchContext } from '../helpers/searchContext';

// BOOTSTRAP COMPONENTS
import { Collapse } from 'react-bootstrap';

// LOCAL COMPONENTS
import SearchForm from './SearchForm';

// STYLES
import styles from './searchCollapse.module.scss';

// MAIN COMPONENT
const SearchCollapse = () => {

  // REFS
  const { show } = useContext(SearchContext) || {};

  // RENDER
  return (
    <div className={styles.container}>
      <Collapse
        in={show}
      >
        <div>
          <SearchForm />
        </div>
      </Collapse>
    </div>
  )
}

// EXPORT
export default SearchCollapse
