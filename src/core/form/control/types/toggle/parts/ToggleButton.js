import React, { useCallback, useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { get } from 'lodash';

// GLOBAL VARIABLES
import { TOGGLE } from 'defaults.js';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// CORE COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './toggleButton.module.scss';

// MAIN COMPONENT
const ToggleButton = ({
  className,
  name,
  value: buttonValue,
  multiple,
  onClick,
  hasError,
  // FORMIK
  form: {
    setFieldValue,
    setFieldTouched,
    values
  } = {},
  // REST
  ...props
}) => {

  // MEMOS
  const value = useMemo(
    () => get(values, name),
    [name, values]
  )
  const active = useMemo(
    () => multiple ? value && value.includes(buttonValue) : buttonValue === value,
    [name, buttonValue, value, multiple]
  )

  // CALLBACKS
  const handleClick = useCallback(
    () => {
      const newValue = multiple
        ? active
          ? value.filter(v => v !== buttonValue)
          : value
            ? [buttonValue].concat(value)
            : [buttonValue]
        : buttonValue;
      doCallback(onClick, newValue);
      doCallback(setFieldTouched, name, true);
      doCallback(setFieldValue, name, newValue);
    },
    [active, name, buttonValue, value, multiple, onClick, setFieldValue, setFieldTouched]
  )

  // RETURN
  return (
    <Button
      className={clsx(
        styles.button,
        active && styles.active,
        hasError && styles.error,
        className
      )}
      onClick={handleClick}
      {...(active ? TOGGLE.active : TOGGLE.inactive)}
      {...props}
    />
  )
}

// EXPORT
export default ToggleButton;
