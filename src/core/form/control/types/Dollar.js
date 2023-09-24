import React, { useMemo } from 'react';

// DEPENDENCIES
import * as yup from 'yup';

// GLOBAL VARIABLES
import { DOLLARS } from 'defaults.js';
import { NUMBER_FORMATS } from 'numberFormats.js';

// GLOBAL FUNCTIONS
import { formatDollar } from 'functions.js';

// LOCAL COMPONENTS
import Control from '../Control';

// MAIN COMPONENT
const Dollar = ({
  min,
  max,
  useCents = DOLLARS.useCents,
  allowNegative = DOLLARS.allowNegative,
  numberFormat = {},
  ...props
}) => {
  const {
    name
  } = props

  // MEMOS
  const validationSchema = useMemo(
    () => {
      const validationSchema = yup.number().transform(value => {
        const float = parseFloat(value);
        return isNaN(float) ? undefined : float;
      })
      .nullable()
      .when(name, (value, passSchema) => min !== undefined && !isNaN(min)
        ? passSchema.min(min, `Must be no less than ${formatDollar(min)}.`)
        : passSchema
      )
      .when(name, (value, schema) => max !== undefined && !isNaN(max)
        ? schema.max(max, `Must be no more than ${formatDollar(max)}.`)
        : schema
      );
      return validationSchema;
    },
    [min, max, name]
  )

  // RENDER
  return (
    <Control
      {...props}
      schema="dollars"
      numberFormat={{
        decimalScale: useCents ? 2 : 0,
        placeholder: useCents? '$X.XX' : NUMBER_FORMATS.dollars.placeholder,
        allowNegative,
        ...numberFormat
      }}
      validationSchema={validationSchema}
    />
  )

}

// EXPORT
export default Dollar;
