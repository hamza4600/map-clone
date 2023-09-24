import React, { useCallback, useMemo, useState } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { useFormikContext } from 'formik';

// GLOBAL VARIABLES
import { YES_NO } from 'defaults.js';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// LOCAL COMPONENTS
import Checklist from './checklist/Checklist';
import Toggle from './toggle/Toggle';

// STYLES
import styles from './yesNo.module.scss';

// MAIN COMPONENT
const YesNo = ({
  className,
  variant,
  numeric = YES_NO.useNumeric,
  toggle  = YES_NO.useToggle,
  group = YES_NO.group,
  type,
  options,
  onValueChange,
  ...props
}) => {

  // CONTEXT
  const { setFieldValue } = useFormikContext() || {};

  // PROPS
  const { name } = props;

  // STATE
  const [ active, setActive ] = useState(false);

  // MEMOS
  const yesNo = useMemo(
    () => {
      const [ yes = {}, no = {} ] = options || [];
      return [
        {
          label: 'Yes',
          value: numeric ? 1 : true,
          ...yes
        },
        {
          label: 'No',
          value: numeric ? 0 : false,
          ...no
        }
      ]
    },
    [numeric, options]
  )

  // CALLBACKS
  const handleValueChange = useCallback(
    response => {
      const { value } = response;
      doCallback(onValueChange, response);
      setActive(value === yesNo[0].value)
    },
    [yesNo, onValueChange, setActive]
  )
  const handleCheck = useCallback(
    response => {
      const { value } = response;
      handleValueChange(response);
      if (value === undefined) setFieldValue(name, false);
    },
    [name, setFieldValue, handleValueChange]
  )

  // RENDER
  return type === 'checkbox' ? (
    <Checklist
      className={styles.checkbox}
      type="checkbox"
      options={[ yesNo[0] ]}
      onValueChange={handleCheck}
      {...props}
    />
  ) : toggle ? (
    <Toggle
      className={clsx(
        styles.toggle,
        props.inline && styles.inline,
        group && styles.group,
        active && styles.active,
        className
      )}
      variant={active ? variant : 'secondary'}
      options={yesNo}
      onValueChange={handleValueChange}
      group={group}
      {...props}
    />
  ) : (
    <Checklist
      className={clsx(
        styles.checklist,
        active && styles.active,
        className
      )}
      type="radio"
      options={yesNo}
      onValueChange={handleValueChange}
      list={{
        direction: 'horizontal',
        justify: 'start'
      }}
      {...props}
    />
  )
}

// EXPORT
export default YesNo;
