import React, { forwardRef, useCallback } from 'react';

// DEPENDENCIES
import { intersectionWith } from 'lodash';

// GLOBAL VARIABLES
import { CHECKLIST } from 'defaults.js';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// MAIN COMPONENT
export const inputArray = Component => {
  return forwardRef(({
    onChange,
    ...props
  }, ref) => {

    // PROPS
    const {
      name,
      value = '',
      type,
      options = [],
      useCSV = CHECKLIST.useCSV,
      useArray = type !== 'radio' && options.length > 1,
      defaultValue = useArray && !useCSV ? [] : '',
      form: {
        setFieldValue
      } = {}
    } = props

    // CALLBACKS
    const handleChange = useCallback(
      e => {
        doCallback(onChange, e);
        if (!useArray) {
          doCallback(setFieldValue, name, e.target.checked ? e.target.value : undefined)
        } else {
          let valueArray = Array.isArray(value) ? value : value.toString().split(',');
          const valueIndex = valueArray.findIndex(value => value.toString() === e.target.value.toString());
          if (e.target.checked) valueArray.push(e.target.value);
          else valueArray.splice(valueIndex, 1);
          valueArray = valueArray.filter(el => el !== undefined && el !== '');
          const sortedArray = intersectionWith(
            options.map(({ value }) => value),
            valueArray,
            (o, v) => o === v || String(o) === String(v)
          );
          const newValue = useCSV ? sortedArray.join(',') : sortedArray;
          doCallback(setFieldValue, name, newValue);
        }
      },
      [name, options, value, useArray, onChange, useCSV, setFieldValue]
    )

    // RENDER
    return <Component
      {...props}
      defaultValue={defaultValue}
      onChange={handleChange}
      ref={ref}
    />
  })
}
