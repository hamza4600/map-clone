import React, { forwardRef } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { compose } from 'redux';

// HELPERS
import { formikField } from './helpers/formik/formikField';
import { inputState } from './helpers/state/inputState';
import { inputConfirmation } from './helpers/state/inputConfirmation';
import { inputValidation } from './helpers/state/inputValidation';
import { numberFormat } from './helpers/state/numberFormat';
import { formCollapse } from './helpers/layout/formCollapse';
import { formGroup } from './helpers/layout/formGroup';
import { inputFeedback } from './helpers/layout/inputFeedback';
import { inputLabel } from './helpers/layout/inputLabel';
import { inputText } from './helpers/layout/inputText';
import { useHidden } from './helpers/layout/useHidden';
import { clearButton } from './helpers/toggles/clearButton';
import { infoButton } from './helpers/toggles/infoButton';
import { lockButton } from './helpers/toggles/lockButton';

// LOCAL COMPONENTS
import Input from './parts/Input';

// STYLES
import styles from './control.module.scss';

// MAIN COMPONENT
const Control = compose(
  inputConfirmation,
  inputValidation,
  formikField,
  inputState,
  numberFormat,
  useHidden,
  formCollapse,
  formGroup,
  inputLabel,
  inputFeedback,
  inputText,
  infoButton,
  clearButton,
  lockButton,
  forwardRef
)(({
  className,
  ...props
}, ref) => (
  <Input
    {...props}
    className={clsx(
      styles.control,
      className
    )}
    ref={ref}
  />
))

// EXPORT
export default Control;
