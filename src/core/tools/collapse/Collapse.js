import React, { useCallback, useContext } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// HELPERS/CONTEXT
import { collapseContext, CollapseContext } from './helpers/collapseContext';

// BOOTSTRAP COMPONENTS
import { Collapse as BSCollapse } from 'react-bootstrap';

// LOCAL COMPONENTS
import Button from '../Button';

// STYLES
import styles from './collapse.module.scss';

// MAIN COMPONENT
const Collapse = ({
  className,
  children,
  toggle: {
    as: Toggle = Button,
    icon,
    onClick,
    ...toggle
  } = {}
}) => {

  // CONTEXT
  const { open, setOpen } = useContext(CollapseContext);

  // CALLBACKS
  const handleClick = useCallback(
    e => {
      doCallback(onClick, e);
      setOpen(!open);
    },
    [open, setOpen, onClick]
  )

  // RENDER
  return (
    <div>
      <Toggle
        {...toggle}
        onClick={handleClick}
        icon={icon || (open ? 'chevron-up' : 'chevron-down')}
      />
      <BSCollapse in={open}>
        <div>
          <div className={clsx(
            styles.collapse,
            className
          )}>
            {children}
          </div>
        </div>
      </BSCollapse>
    </div>
  )
}

// EXPORT
export default collapseContext(Collapse);
