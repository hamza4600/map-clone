import React, { useCallback } from 'react';

// DEPENDENCIES
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// STYLES
import styles from './perPage.module.scss';

// MAIN COMPONENT
export default compose(
  withRouter
)(({
  rowsOnPage,
  // REACT ROUTER
  history,
  location
}) => {

  // CALLBACKS
  const handleSelect = useCallback(
    value => {
      history.push({
        pathname: location.pathname,
        search: '?' + queryString.stringify({
          ...location.search,
          rowsOnPage: value
        })
      })
    },
    [history, location]
  )

  // RENDER
  return (
    <Form
      initialValues={{
        rowsOnPage
      }}
    >
      <Form.Row>
        <Form.Select
          className={styles.select}
          name="rowsOnPage"
          label={{
            title: 'Per Page',
            col: {
              lg: 10
            }
          }}
          options={[ 12, 25, 50, 100 ]}
          defaultValue={25}
          onSelect={handleSelect}
          formGroup={{
            className: styles.formGroup
          }}
          drop="up"
        />
      </Form.Row>
    </Form>
  )
})
