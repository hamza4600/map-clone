import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// BOOTSTRAP COMPONENTS
import { Form } from 'react-bootstrap';

// CORE COMPONENTS
import Sprite from 'core/tools/Sprite';

// LOCAL COMPONENTS
import Control from '../../../Control';

// STYLES
import styles from './checkbox.module.scss';

// CHILD COMPONENT
const DependentControl = ({
  as: Component = Control,
  className,
  checked,
  size,
  direction,
  disabled,
  required,
  ...props
}) => (
  <Component
    className={clsx(
      styles.formControl,
      className
    )}
    formGroup={{
      className: clsx(
        styles.formGroup,
        styles[direction]
      ),
      xs: 10,
      sm: 8,
      md: true
    }}
    size={size}
    disabled={!checked || disabled}
    required={required && checked}
    {...props}
  />
)

// MAIN COMPONENT
const Checkbox = ({
  className,
  type = 'checkbox',
  name,
  value,
  label,
  checked,
  onBlur,
  onChange,
  hasError,
  size,
  direction,
  control,
  required,
  disabled,
  debug,
  ...props
}) => (
  <div className={clsx(
    styles.container,
    styles[size],
    styles[direction],
    control && styles.control
  )}>
    <Form.Check
      className={clsx(
        'checkbox',
        styles.checkbox,
        className
      )}
      type={type}
    >
      <Form.Check.Input
        className={clsx(
          styles.input,
          disabled && styles.disabled
        )}
        type={type}
        name={name}
        value={value}
        checked={checked}
        onBlur={onBlur}
        onChange={onChange}
        disabled={disabled}
      />
      <div className={clsx(
        'form-check-sprite',
        styles.sprite,
        hasError && styles.error
      )}>
        <Sprite
          as={false}
          use={type === 'checkbox' ? 'check' : 'radio'}
          size="xs"
        />
      </div>
      {label &&
        <Form.Check.Label
          className={styles.label}
        >
          {label}
        </Form.Check.Label>
      }
    </Form.Check>
    {!!control &&
      <DependentControl
        {...control}
        checked={checked}
        size={size}
        direction={direction}
        disabled={disabled}
        required={required}
        debug={debug}
      />
    }
  </div>
)

// EXPORT
export default Checkbox;
