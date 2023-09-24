import React, { useCallback, useContext } from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// CONTEXT
import { FormArgsContext } from '../../helpers/formSubmit';

// CORE COMPONENTS
import Button from 'core/tools/Button';

// MAIN COMPONENT
const SaveButton = ({
  onClick,
  onSave,
  ...props
}) => {

  // FORMIK CONTEXT
  const { submitForm } = useFormikContext() || {};

  // CONTEXT
  const { updateArgs } = useContext(FormArgsContext) || {};

  // CALLBACKS
  const handleClick = useCallback(
    e => {
      e.preventDefault();
      if (onSave) doCallback(updateArgs, {
        onSuccess: onSave
      });
      submitForm();
    },
    [onSave, updateArgs, submitForm]
  )

  // RENDER
  return (
    <Button.Save
      onClick={onClick || handleClick}
      {...props}
    />
  )
}

// EXPORT
export default SaveButton
