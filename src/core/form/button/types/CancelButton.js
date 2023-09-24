import React, { useCallback } from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';
import { isEqual } from 'lodash';

// GLOBAL FUNCTIONS
import { doCallback, modalFunctions } from 'functions.js';

// CORE COMPONENTS
import Button from 'core/tools/Button';

// MAIN COMPONENT
const CancelButton = ({
  onClick,
  onCancel,
  modal = {},
  ...props
}) => {

  // FORMIK CONTEXT
  const { initialValues, values } = useFormikContext() || {};

  // CALLBACKS
  const handleClick = useCallback(
    e => {

      if (isEqual(initialValues, values)) doCallback(onCancel, values);

      else modalFunctions.add({
        type:  'Confirmation',
        title: `Are you sure you want to cancel?`,
        body:  'All unsaved changes will be lost.',
        cancelButton: {
          label:   'Never Mind'
        },
        continueButton: {
          variant: 'danger',
          label:   'Discard Changes',
          icon:    'trash-alt',
          onClick: onCancel
        },
        ...modal
      })
    },
    [modal, onCancel, initialValues, values]
  )

  // RENDER
  return (
    <Button.Cancel
      onClick={onClick || handleClick}
      {...props}
    />
  )
}

// EXPORT
export default CancelButton
