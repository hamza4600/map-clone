import React, { forwardRef, useCallback, useMemo, useState } from 'react';

// DEPENDENCIES
import { isObject, isString } from 'lodash';
import * as yup from 'yup';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// LOCAL COMPONENTS
import Confirmation from '../../parts/Confirmation';

// MAIN COMPONENT
export const inputConfirmation = Component => {
  return forwardRef(({
    onChange,
    confirmed,
    useConfirmation = !!confirmed,
    confirmationProps = isObject(confirmed) ? confirmed : {},
    ...props
  }, ref) => {

    // VALIDATION STATE
    const [ validationSchema, setValidationSchema ] = useState();

    // CONFIRM LABEL PROPS
    const label = useMemo(
      () => isObject(props.label) ? ({
        ...props.label,
        title: props.label.title ? `Confirm ${props.label.title}` : undefined
      }) : isString(props.label) ? `Confirm ${props.label}` : undefined,
      [props.label]
    )

    // CALLBACKS
    const yupObject = useCallback(
      value => !value ? undefined : yup.string().matches(value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), `Confirmation does not match`),
      []
    )
    const handleChange = useCallback(
      e => {
        doCallback(onChange, e);
        if (useConfirmation) setValidationSchema(yupObject(e.target.value));
      },
      [onChange, useConfirmation, setValidationSchema, yupObject]
    )

    // RENDER
    return (<>
      <Component
        {...props}
        onChange={handleChange}
        ref={ref}
      />
      {useConfirmation &&
        <Confirmation
          {...props}
          name={`confirmation.${props.name}`}
          label={label}
          clearButton={true}
          validationSchema={validationSchema}
          required={!!validationSchema}
          {...confirmationProps}
        />
      }
    </>)
  })
}
