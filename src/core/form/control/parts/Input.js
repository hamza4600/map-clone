import React, { forwardRef } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { PLACEHOLDERS } from 'defaults.js';

// HELPERS
import { inputFocus } from '../helpers/state/inputFocus';
import { inputGroup } from '../helpers/layout/inputGroup';
import { inputGroupAddons } from '../helpers/layout/inputGroupAddons';

// BOOTSTRAP COMPONENTS
import { Form } from 'react-bootstrap';

// STYLES
import styles from './input.module.scss';

// MAIN COMPONENT
const Input = compose(
  inputFocus,
  inputGroup,
  inputGroupAddons,
  forwardRef
)(({
  id,
  as,
  className,
  type = 'text',
  schema,
  name,
  value = '',
  placeholder = PLACEHOLDERS.input,
  onBlur,
  onChange,
  onClick,
  onFocus,
  onKeyDown,
  required,
  readOnly,
  disabled,
  plaintext,
  inline,
  size,
  rows,
  htmlSize,
  autoComplete,
  tabindex,
  input = {}
}, ref) => as === 'text' ? (
  <span
    className={clsx(
      'form-control',
      styles.control,
      styles.text,
      styles[size],
      className
    )}
    onBlur={onBlur}
    onClick={onFocus}
    onFocus={onFocus}
  >
    {value}
  </span>
) : (
  <Form.Control
    id={id}
    className={clsx(
      styles.control,
      styles[size],
      className
    )}
    type={type}
    as={as}
    name={plaintext ? undefined : name}
    value={value}
    placeholder={!!plaintext ? '-' : !!disabled || !!readOnly ? undefined : placeholder}
    onBlur={onBlur}
    onChange={onChange}
    onClick={onClick}
    onFocus={onFocus}
    onKeyDown={onKeyDown}
    required={required}
    readOnly={readOnly || plaintext}
    disabled={disabled}
    plaintext={plaintext}
    size={size}
    htmlSize={htmlSize}
    rows={rows}
    autoComplete={autoComplete === true ? 'on' : autoComplete || 'off'}
    tabIndex={readOnly || disabled || plaintext ? -1 : tabindex}
    ref={ref}
    {...input}
  />
))

// EXPORT
export default Input;
