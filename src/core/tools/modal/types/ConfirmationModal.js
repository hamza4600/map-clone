import React from 'react';

// GLOBAL VARIABLES
import { MODAL } from 'defaults.js';

// CORE COMPONENTS
import Button from 'core/tools/Button';

// LOCAL COMPONENTS
import DialogModal from './DialogModal';

// MAIN COMPONENT
const ConfirmationModal = ({
  cancelButton: {
    as: CancelButton = Button.Cancel,
    ...cancelButton
  } = {},
  continueButton: {
    as: ContinueButton = Button.Submit,
    ...continueButton
  } = {},
  ...props
}) => (
  <DialogModal
    {...props}
    buttons={[
      CancelButton === null ? null : (
        <CancelButton
          {...MODAL.cancelButton}
          {...cancelButton}
          sprite={Object.assign({}, MODAL.cancelButton.sprite, cancelButton.sprite)}
        />
      ),
      ContinueButton === null ? null : (
        <ContinueButton
          label='Continue'
          {...MODAL.continueButton}
          {...continueButton}
          sprite={Object.assign({}, MODAL.continueButton.sprite, continueButton.sprite)}
        />
      )
    ]}
  />
)

// EXPORT
export default ConfirmationModal;
