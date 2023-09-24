import React, { forwardRef, useCallback, useEffect, useMemo } from 'react';

// DEPENDENCIES
import { get, identity } from 'lodash';

// GLOBAL VARIABLES
import { CONTROL } from 'defaults.js';

// GLOBAL FUNCTIONS
import { bugLog, doCallback } from 'functions.js';

// MAIN COMPONENT
export const inputState = Component => forwardRef(({
  value: defaultValue,
  formatValue = identity,
  onValueChange,
  clearDisabled = CONTROL.clearDisabled,
  ...props
}, ref) => {

  // PROPS
  let {
    name,
    disabled,
    debug,
    form: {
      setFieldValue,
      setFieldError,
      validateField,
      values
    } = {}
  } = props;

  // MEMOS
  const value = useMemo(
    () => {
      const value = get(values, name);
      return formatValue(value !== null && value !== undefined ? value : defaultValue)
    },
    [name, values, defaultValue, formatValue]
  )

  // CALLBACKS
  const initValue = useCallback(
    () => {
      bugLog('init value', debug, name, value);
      doCallback(setFieldValue, name, value);
    },
    [name, value, debug, setFieldValue]
  )
  const clearValue = useCallback(
    () => {
      bugLog('clear value', debug, name);
      doCallback(setFieldValue, name, undefined);
    },
    [name, debug, setFieldValue]
  )
  const clearErrors = useCallback(
    () => {
      bugLog('clear errors', debug, name);
      doCallback(setFieldError, name, undefined);
    },
    [name, debug, setFieldError]
  )

  // LISTENERS
  useEffect(
    () => {
      initValue();
      return clearValue;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  useEffect(
    () => {
      bugLog('value', debug, name, value === '' ? 'BLANK' : value);
      doCallback(onValueChange, {name, value});
      doCallback(setFieldValue, name, value);
      doCallback(validateField, name);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value]
  )
  useEffect(
    () => {
      if (disabled && clearDisabled) clearValue();
      if (disabled) clearErrors();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabled, clearDisabled]
  )

  // RENDER
  return <Component {...props} value={value} ref={ref} />
})
