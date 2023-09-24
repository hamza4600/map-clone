import React, { useCallback, useContext } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// FUNCTIONS
import { doCallback } from 'functions.js';

// CONTEXT
import { DealershipContext } from '../helpers/dealershipContext';
import { CollapseContext } from 'core/tools/collapse/helpers/collapseContext';
import { DropdownContext } from 'core/tools/dropdown/helpers/dropdownContext';

// BOOTSTRAP COMPONENTS
import { ListGroup } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './dealershipItem.module.scss';

// MAIN COMPONENT
const DealershipItem = ({
  dealershipID,
  active,
  ...props
}) => {

  // CONTEXT
  const { chooseStore } = useContext(DealershipContext);
  const { setOpen } = useContext(CollapseContext) || {};
  const { setShow } = useContext(DropdownContext) || {};

  // CALLBACKS
  const handleClick = useCallback(
    () => {
      chooseStore(dealershipID);
      doCallback(setOpen, false);
      doCallback(setShow, false);
    },
    [dealershipID, chooseStore, setOpen, setShow]
  )

  // RENDER
  return (
    <ListGroup.Item
      as={Button}
      className={clsx(
        styles.item,
        active && styles.active
      )}
      variant="custom"
      icon={active ? 'check' : undefined}
      onClick={!active ? handleClick : undefined}
      justify="start"
      round={false}
      fullWidth
      {...props}
    />
  )
}

export default DealershipItem
