import React, { forwardRef } from 'react';

// DEPENDENCIES
import { Field } from 'formik';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// MAIN COMPONENT
export const formikField = Component => forwardRef(({
  validationSchema,
  onValidate,
  useFormik = true,
  // REST
  ...props
}, ref) => !!props.name && !!useFormik ? ( // eslint-disable-line
  <Field
    name={props.name}
    validate={onValidate}
  >{({ field, form, meta }) => (
    <Component
      {...props}
      form={form}
      meta={{
        validationSchema,
        ...meta
      }}
      value={field.value || props.value}
      onBlur={e => {
        doCallback(props.onBlur, e);
        field.onBlur(e);
      }}
      onChange={e => {
        doCallback(props.onChange, e);
        field.onChange(e);
      }}
      forwardChange={props.onChange}
      ref={ref}
    />
  )}</Field>
) : (
  <Component
    {...props}
    ref={ref}
  />
))
