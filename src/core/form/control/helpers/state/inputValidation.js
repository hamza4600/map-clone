import React, { forwardRef, useCallback, useMemo } from 'react';

// DEPENDENCIES
import * as yup from 'yup';

// GLOBAL FUNCTIONS
import { bugLog } from 'functions.js';

// LOCAL FUNCTIONS
const blankToNull = (value, originalValue) => originalValue.trim() === "" ? null: value;

// LOCAL VARIABLES
const VALIDATION = {
  email:       yup.string().email('Invalid email.'),
  charkey:     yup.string().matches(/^[A-Z]{6}$/, 'Invalid character key.'),
  passkey:     yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Invalid password.',
    excludeEmptyString: true
  }),
  postalCode:  yup.string().matches(/^\d{5}(?:[-\s]\d{4})?$/, {
    message: 'Invalid postal code.',
    excludeEmptyString: true
  }),
  required:    yup.mixed().required('Required field.'),
  true:        yup.mixed().oneOf(['true', '1'], `User must select 'Yes' to continue.`),
  tel:         yup.string().matches(/^\+1 \([2-9]{1}[0-9]{2}\) [2-9]{1}[0-9]{2}-[0-9]{4}$/, {
    message: 'Invalid phone number.',
    excludeEmptyString: true
  }),
  text:        yup.string().ensure(),
  year:        yup.number().typeError('Invalid year.').nullable().min(1900, 'Invalid year.').transform(blankToNull)
  //year:        yup.number().typeError('Invalid year.').nullable().min(1900, 'Invalid year.').max(new Date().getFullYear(), 'Invalid year.').transform(blankToNull)
}

// MAIN COMPONENT
export const inputValidation = Component => forwardRef((props, ref) => {

  // PROPS
  let {
    name,
    type,
    schema,
    validationSchema = VALIDATION[schema] || VALIDATION[type],
    required,
    disabled,
    plaintext,
    readOnly,
    debug
  } = props;

  // MEMOS
  validationSchema = useMemo(
    () => disabled || plaintext || readOnly ? undefined : required ? VALIDATION.required.concat(validationSchema || VALIDATION.text) : validationSchema,
    [validationSchema, required, disabled, plaintext, readOnly]
  )

  // CALLBACKS
  const handleValidate = useCallback(
    (value = '') => {
      value = value === null ? '' : value.toString();
      bugLog('validate', debug, name, value);
      if (!!validationSchema) {
        return validationSchema.validate(value)
          .then(response => {
            bugLog('valid', debug, name);
            return null;
          })
          .catch(({ errors }) => {
            bugLog('error', debug, name, errors[0]);
            return errors[0]
          })
      } else {
        bugLog('no validation', debug, name);
        return null;
      }
    },
    [name, validationSchema, debug]
  )

  // RENDER
  return <Component {...props} validationSchema={validationSchema} onValidate={handleValidate} ref={ref} />;
})
