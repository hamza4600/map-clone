import React, { useCallback, useContext } from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';
import { isEmpty } from 'lodash';
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
const Next = compose(
  withRouter
)(({
  to,
  onClick,
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
    touched,
    validateForm,
    submitForm
  } = useFormikContext() || {};

  // CONTEXT
  const { idKey, recordID, fetchRecord } = useContext(RecordContext) || {};
  const {
    args: {
      onSuccess
    },
    updateArgs
  } = useContext(RecordFormContext) || {};

  // CALLBACKS
  const redirect = useCallback(
    recordID => {
      if (!!to && !!recordID) history.push(makePath(to, recordID))
    },
    [to, history]
  )
  const handleClick = useCallback(
    e => {
      doCallback(onClick, e);
      validateForm().then(errors => {
        if (isEmpty(touched) && isEmpty(errors)) redirect(recordID);
        else {
          doCallback(updateArgs, {
            onSuccess: (data = {}) => {
              doCallback(onSuccess, data);
              doCallback(fetchRecord, recordID);
              redirect(recordID || data[idKey]);
            }
          })
          submitForm();
        }
      })
    },
    [onClick, redirect, touched, idKey, recordID, fetchRecord, updateArgs, validateForm, submitForm, onSuccess]
  )

  // RENDER
  return (
    <Button.Save
      type="button"
      label="Next Step"
      sprite={{
        use:   'arrow-right'
      }}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    />
  )
})

// EXPORT
export default Next
