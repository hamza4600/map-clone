import React, { useRef } from 'react';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// CORE COMPONENTS
import Button from 'core/tools/Button';
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import ConfirmationModal from './ConfirmationModal';

// MAIN COMPONENT
const FormModal = ({
  body,
  args,
  fields,
  continueButton,
  ...props
}) => {

  const form = useRef();

  return <ConfirmationModal
    body={(<>
      {body}
      <Form
        ref={form}
        {...args}
      >
        {fields}
      </Form>
    </>)}
    continueButton={{
      ...continueButton,
      as: Button.Submit,
      onClick: () => doCallback(form.current.submitForm),
    }}
    {...props}
  />
}

// EXPORT
export default FormModal;
