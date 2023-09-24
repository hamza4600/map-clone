import React, { forwardRef, useCallback, useMemo, useRef } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { isFunction } from 'lodash';

// // GLOBAL VARIABLES
import { APPEND, PREPEND } from 'defaults.js';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// BOOTSTRAP COMPONENTS
import { InputGroup } from 'react-bootstrap';

// CORE COMPONENTS
import Sprite from 'core/tools/Sprite'

// STYLES
import styles from './inputGroupAddons.module.scss';

// MAIN COMPONENT
export const inputGroupAddons = Component => forwardRef(({
  prepend,
  append,
  ...props
}, ref) => {

  // PROPS
  const {
    type,
    schema,
    size,
    plaintext
  } = props;

  // REFS
  const internalRef = useRef();
  const input = ref || internalRef;

  // MEMOS
  prepend = useMemo(
    () => prepend || PREPEND[type] || PREPEND[schema] || {},
    [prepend, type, schema]
  )
  append = useMemo(
    () => append || APPEND[type] || APPEND[schema] || {},
    [append, type, schema]
  )

  // CLICK HANDLER
  const handleClick = useCallback(
    e => {
      doCallback(props.onClick, e);
      if (input.current && isFunction(input.current.focus)) input.current.focus();
    },
    [props.onClick, input]
  )

  // RENDER
  return (<>
    <Addon
      as={InputGroup.Prepend}
      size={size}
      plaintext={plaintext}
      {...prepend}
      onClick={prepend.onClick || handleClick}
    />
    <Component
      {...props}
      ref={ref}
    />
    <Addon
      as={InputGroup.Append}
      size={size}
      plaintext={plaintext}
      {...append}
      onClick={append.onClick || handleClick}
    />
  </>)
})

const Addon = ({
  as: Component = InputGroup.Append,
  children,
  className,
  label,
  use,
  onClick,
  size,
  plaintext,
  ...props
}) => (!children && !label && !use) || plaintext ? null : (
  <Component
    className={clsx(
      styles.addon,
      Component === InputGroup.Append ? styles.append : styles.prepend,
      onClick ? styles.pointer : undefined
    )}
    onClick={onClick}
  >
    <InputGroup.Text
      className={clsx(
        styles.text,
        size === 'sm' ? styles.small : '',
        className
      )}
    >
      {children ? children : label ? (
        <span className={styles.label}>{label}</span>
      ) : (
        <Sprite
          className={clsx(
            styles.sprite,
            onClick && styles.hover
          )}
          use={use}
          size={size}
          {...props}
        />
      )}
    </InputGroup.Text>
  </Component>
)
