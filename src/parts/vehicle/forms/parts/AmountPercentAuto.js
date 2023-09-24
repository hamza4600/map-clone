import React, { useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// FUNCTIONS
import { inputName } from 'functions.js';

// GLOBAL COMPONENTS
import Adjustment from 'tools/Adjustment';

// LOCAL COMPONENTS
import Form from 'core/form/Form';

// STYLES
import styles from './amountPercentAuto.module.scss';

// MAIN COMPONENT
const AmountPercentAuto = ({
  name,
  label,
  auto = 1234,
  disabled,
  ...props
}) => {

  // MEMOS
  const options = useMemo(
    () => ([
      {
        label: 'By Amount',
        value: 'AMT',
        control: {
          className: styles.input,
          name: inputName('amount', name),
          schema: 'dollars'
        }
      },
      {
        label: 'By Percent',
        value: 'PCT',
        control: {
          className: styles.input,
          name: inputName('percent', name),
          schema: 'percent'
        }
      },
      {
        label: 'Auto',
        value: 'ARC',
        control: {
          as: Adjustment,
          className: clsx(
            disabled && styles.disabled,
            styles.auto
          ),
          value: auto,
        }
      }
    ]),
    [name, auto, disabled]
  )

  //RENDER
  return (
    <Form.Checklist
      name={inputName('method', name)}
      label={{
        className: 'input-label-unstyled',
        label
      }}
      type="radio"
      options={options}
      list={{
        direction: 'horizontal'
      }}
      fullWidth
      disabled={disabled}
      {...props}
    />
  )
}

// EXPORT
export default AmountPercentAuto;
