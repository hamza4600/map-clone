import React, { useCallback, useEffect, useState } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// BOOTSTRAP COMPONENTS
import { Collapse } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './collapse.module.scss';

// MAIN COMPONENT
export default ({
  children,
  id,
  className,
  header: Header = 'h4',
  label,
  disabled,
  isOpen,
  defaultOpen = false,
  useChevron = false,
  ...props
}) => {

  // OPEN STATE
  const [ open, setOpen ] = useState(defaultOpen);

  // CLICK HANDLER
  const handleClick = useCallback(
    () => {
      if (!disabled) setOpen(!open);
    },
    [disabled, open, setOpen]
  )

  // PROP-INSTIGATED OPEN
  useEffect(
    () => {
      setOpen(isOpen)
    },
    [isOpen, setOpen]
  )

  // PROP-INSTIGATED CLOSE
  useEffect(
    () => {
      if (disabled) setOpen(false)
    },
    [disabled, setOpen]
  )

  // RENDER
  return (
    <div>
      <Header
        className={styles.header}
        open={open}
        disabled={disabled}
        onClick={handleClick}
      >
        {label}
        {useChevron &&
          <Button.Link
            className={styles.button}
            sprite={{
              use: open ? 'chevron-up' : 'chevron-down',
              fill: open ? 'accent-light' : disabled ? 'extra-light' : 'light',
              size: 'sm'
            }}
            size="sm"
            onClick={handleClick}
            aria-controls={id}
            aria-expanded={open}
          />
        }
      </Header>
      <Collapse
        className={clsx(
          styles.collapse,
          className
        )}
        in={open}
        {...props}
      >
        <div id={id}>
          {children}
        </div>
      </Collapse>
    </div>
  )
}
