import React, { useCallback, useContext } from 'react';

// GLOBAL VARIABLES
import { BUTTON } from 'defaults.js';

// DEPENDENCIES
import { useFormikContext } from 'formik';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { compose } from 'redux';

// FUNCTIONS
import { doCallback, makePath, modalFunctions } from 'functions.js';

// CONTEXT
import { RecordFormContext } from '../../../parts/RecordForm';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// MAIN COMPONENT
const Cancel = compose(
  connect(
    ({ mobile }) => ({ mobile })
  ),
  withRouter
)(({
  onClick,
  onCancel,
  to,
  modal = {},
  disabled,
  // REDUX STATE
  mobile,
  // REACT ROUTER
  history,
  location,
  match,
  staticContext,
  // REST
  ...props
}) => {

  // CONTEXT
  const { redirect = to } = useContext(RecordFormContext) || {};

  // FORMIK CONTEXT
  const { touched } = useFormikContext() || {};

  // CALLBACKS
  const redirectUser = useCallback(
    () => {
      history.push(makePath(redirect || '/'))
    },
    [redirect, history]
  )
  const handleClick = useCallback(
    e => {
      doCallback(onClick, e);

      if (isEmpty(touched)) redirectUser();

      else modalFunctions.add({
        type:  'Confirmation',
        title: `Are you sure you want to cancel?`,
        body:  'All unsaved changes will be lost.',
        cancelButton: {
          variant: 'primary',
          label:   'Never Mind',
          icon:    false,
          outline: true
        },
        continueButton: {
          variant: 'danger',
          label:   'Discard Changes',
          icon:    'trash',
          onClick: redirectUser
        },
        ...modal
      })
    },
    [modal, onClick, touched, redirectUser]
  )

  // RENDER
  return (
    <Button.Cancel
      label={mobile ? '' : BUTTON.cancel.label}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    />
  )
})

// EXPORT
export default Cancel
