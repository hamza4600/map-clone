import React, { useContext } from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { compose } from 'redux';

// CONTEXT
import { SearchContext } from '../helpers/searchContext';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// STYLES
import styles from './searchForm.module.scss';

// MAIN COMPONENT
const SearchForm = compose(
  connect(
    ({ mobile }) => ({ mobile })
  )
)(({
  name = 'searchKeyword',
  // REDUX STATE
  mobile
}) => {

  // REFS
  const { value, controlRef, handleSubmit } = useContext(SearchContext) || {};

  // RENDER
  return (
    <Form
      className={styles.form}
      inline
      initialValues={{
        [name]: value
      }}
      onSubmit={handleSubmit}
    >
      <Form.Body>
        <Form.Control
          className={styles.control}
          name={name}
          prepend={{
            className: styles.prepend,
            label: mobile ? 'Search:' : undefined
          }}
          formGroup={{
            className: styles.group
          }}
          ref={controlRef}
        />
      </Form.Body>
    </Form>
  )
})

// EXPORT
export default SearchForm;
