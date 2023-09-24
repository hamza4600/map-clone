import React, { useContext } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { startCase } from 'lodash';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

// FUNCTIONS
import { makePath } from 'functions.js';

// CONTEXT
import { ListContext } from '../../../helpers/listContext';

// CORE COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './addButton.module.scss';

// MAIN COMPONENT
const AddButton = compose(
  withRouter
)(({
  className,
  // REACT ROUTER
  location
}) => {

  // CONTEXT
  const { label } = useContext(ListContext) || {};

  // RENDER
  return (
    <Button.Add
      className={clsx(
        styles.button,
        className
      )}
      variant="accent"
      label={`Add ${startCase(label)}`}
      to={makePath(location.pathname, 'add')}
    />
  )
})

// EXPORT
export default AddButton;
