import React, { forwardRef } from 'react';

// DEPENDENCIES
import { compose } from 'redux';

// HELPERS
import { formikField } from '../helpers/formik/formikField';
import { inputState } from '../helpers/state/inputState';
import { inputValidation } from '../helpers/state/inputValidation';
import { numberFormat } from '../helpers/state/numberFormat';
import { formGroup } from '../helpers/layout/formGroup';
import { inputFeedback } from '../helpers/layout/inputFeedback';
import { inputLabel } from '../helpers/layout/inputLabel';
import { inputText } from '../helpers/layout/inputText';
import { clearButton } from '../helpers/toggles/clearButton';

// LOCAL COMPONENTS
import Input from './Input';

// MAIN COMPONENT
const Confirmation = compose(
  inputValidation,
  formikField,
  inputState,
  numberFormat,
  formGroup,
  inputLabel,
  inputFeedback,
  inputText,
  clearButton,
  forwardRef
)(props => (
  <Input
    {...props}
  />
))

// EXPORT
export default Confirmation;
