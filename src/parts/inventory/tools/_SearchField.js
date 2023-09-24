import React, { useCallback, useEffect, useState } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { useFormikContext } from 'formik';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// STYLES
import styles from './searchField.module.scss';

// MAIN COMPONENT
export default ({
  name,
  value,
  ...props
}) => {

  // FORMIK CONTEXT
  const { setFieldValue } = useFormikContext() || {};

  // EMPTY CALLBACK
  const isEmpty = useCallback(
    value => value === undefined || value === '',
    []
  )

  // EMPTY STATE
  const [ empty, setEmpty ] = useState(isEmpty(value))

  // CHANGE HANDLER
  const handleChange = useCallback(
    e => setEmpty(isEmpty(e.target.value)),
    [setEmpty, isEmpty]
  )

  // PROP-INSTIGATED UPDATE
  useEffect(
    () => {
      setEmpty(isEmpty(value));
      setFieldValue(name, value);
    },
    [name, value, setFieldValue, setEmpty, isEmpty]
  )

  // RENDER
  return (
    <Form.Control
      className={clsx(
        styles.field,
        empty && styles.empty
      )}
      name={name}
      onChange={handleChange}
      append={{
        use: 'search'
      }}
      formGroup={{
        className: styles.group
      }}
      {...props}
    />
  )
}
