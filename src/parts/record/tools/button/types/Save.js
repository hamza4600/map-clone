import React, { useCallback, useContext } from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';
import { withRouter } from 'react-router';
import { compose } from 'redux';

// FUNCTIONS
import { doCallback, makePath } from 'functions.js';

// CONTEXT
import { RecordContext } from 'helpers/recordContext';
import { RecordFormContext } from '../../../parts/RecordForm';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// MAIN COMPONENT
const Save = compose(
  withRouter
)(({
  onClick,
  to,
  close = false,
  reset,
  disabled,
  // REACT ROUTER
  history,
  location,
  match,
  staticContext,
  // REST
  ...props
}) => {

  // FORMIK CONTEXT
  const {
    submitForm,
    resetForm
  } = useFormikContext() || {};

  // CONTEXT
  const { idKey, recordID } = useContext(RecordContext) || {};
  const {
    redirect = to,
    args: {
      onResponse,
      onSuccess
    },
    updateArgs
  } = useContext(RecordFormContext) || {};

  // CALLBACKS
  const redirectUser = useCallback(
    (response = {}) => {
      const newID = response[idKey];
      if (close) history.push(makePath(redirect || '/'));
      else if (!!redirect && !recordID && !!newID) history.push(makePath(redirect, 'edit', newID));
    },
    [recordID, idKey, redirect, close, history]
  )
  const handleClick = useCallback(
    e => {
      doCallback(onClick, e);
      doCallback(updateArgs, {
        onResponse: response => {
          doCallback(onResponse, response)
        },
        onSuccess: data => {
          doCallback(onSuccess, data);
          if (reset) {
            resetForm();
            document.documentElement.scrollTop = 0;
          }
          else redirectUser(data);
        }
      })
      submitForm();
    },
    [onClick, reset, updateArgs, redirectUser, submitForm, resetForm, onResponse, onSuccess]
  )

  // RENDER
  return (
    <Button.Save
      type="button"
      onClick={handleClick}
      disabled={disabled}
      {...props}
    />
  )
})

// EXPORT
export default Save
