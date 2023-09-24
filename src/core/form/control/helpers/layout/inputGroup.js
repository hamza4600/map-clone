import React, { forwardRef } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// BOOTSTRAP COMPONENTS
import { InputGroup } from 'react-bootstrap';

// STYLES
import styles from './inputGroup.module.scss';

// MAIN COMPONENT
export const inputGroup = Component => forwardRef(({
  inputGroup = {},
  ...props
}, ref) => {

  // PROPS
  const {
    size,
    inline,
    vertical,
    columns,
    fullWidth
  } = props;

  // RENDER
  return (
    <InputGroup
      {...inputGroup}
      className={clsx(
        styles.inputGroup,
        {
          'form-control-focus':props.focus,
          'form-control-disabled':props.disabled,
          'form-control-read-only':props.readOnly,
          'form-control-empty':!props.value,
          'form-control-error':props.hasError
        },
        inline && styles.inline,
        vertical && styles.vertical,
        columns && styles.columns,
        fullWidth && styles.fullWidth,
        props.disabled && styles.disabled,
        props.readOnly && styles.readOnly,
        inputGroup.className
      )}
      size={size}
    >
      <Component
        {...props}
        ref={ref}
        size={size}
      />
    </InputGroup>
  )
})
