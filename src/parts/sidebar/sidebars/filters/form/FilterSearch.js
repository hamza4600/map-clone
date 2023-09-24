import React from 'react';

// FUNCTIONS
import { doCallback } from 'functions.js';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// STYLES
import styles from '../filters.module.scss';

// MAIN COMPONENT
export default  ({
  onChange
}) => (
  <Form id="filter-search" className={styles.search}>
    <Form.Body>
      <Form.Control
        name="column-search"
        placeholder="Search"
        append={{
          use: 'search'
        }}
        onChange={e => doCallback(onChange, e.target.value)}
        size="sm"
        clearButton
        fullWidth
      />
    </Form.Body>
  </Form>
)
