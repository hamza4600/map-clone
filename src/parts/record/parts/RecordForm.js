import React, { createContext, useCallback, useContext, useReducer } from 'react';

// DEPENDENCIES
import { withRouter } from 'react-router';
import { compose } from 'redux';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// CONTEXT
import { RecordContext } from 'helpers/recordContext';

// CORE COMPONENTS
import Form from 'core/form/Form';

// STYLES
import styles from './recordForm.module.scss';

// LOCAL CONTEXT
export const RecordFormContext = createContext(null);

// LOCAL VARIABLES
const reducer = (state, { type, ...action }) => {

  switch (type) {

    case 'updateProps':
      return {
        ...state,
        ...action
      }

    default:
      throw new Error();
  }
}

// MAIN COMPONENT
const RecordForm = compose(
  withRouter
)(({
  children,
  args = {},
  redirect,
  // REACT ROUTER
  history,
  location,
  match: {
    params: {
      recordID
    }
  },
  staticContext,
  // REST
  ...props
}) => {

  // CONTEXT
  const {
    label,
    record
  } = useContext(RecordContext) || {};

  // STATE
  const [ argReducer, setArgs ] = useReducer(reducer, args);
  const { endpoint, ...argProps } = argReducer;

  // CALLBACK
  const updateArgs = useCallback(
    (args = {}) => {
      setArgs({
        type: 'updateProps',
        ...args
      })
    },
    [setArgs]
  )

  // RENDER
  return (
    <RecordFormContext.Provider value={{
      redirect,
      args: argReducer,
      updateArgs
    }}>
      <Form
        initialValues={record}
        method={!recordID ? 'POST' : 'PUT'}
        endpoint={makePath(endpoint, recordID)}
        loadingMessage={`Updating ${label} entry`}
        errorMessage={`Unable to ${!recordID ? 'add' : 'update'} ${label} entry.`}
        {...argProps}
        {...props}
      >{children}</Form>
    </RecordFormContext.Provider>
  )
})

// CHILD COMPONENTS
RecordForm.Footer = ({
  children
}) => (
  <div className={styles.footer}>
    {children}
  </div>
)

// EXPORT
export default RecordForm;
