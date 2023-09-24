import React, { forwardRef } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL VARIABLES
import { FORM_GROUP } from 'defaults.js';

// BOOTSTRAP COMPONENTS
import { Form } from 'react-bootstrap';

// LOCAL COMPONENTS
import Col from '../../../parts/Col';

// STYLES
import styles from './formGroup.module.scss';

// MAIN COMPONENT
export const formGroup = Component => forwardRef(({
  formGroup = {},
  ...props
}, ref) => (
  <Form.Group
    as={Col}
    cols={props.inline ? FORM_GROUP.cols.inline : props.columns ? FORM_GROUP.cols.columns : FORM_GROUP.cols.default}
    {...formGroup}
    className={clsx(
      styles.group,
      formGroup.className
    )}
  >
    <Component
      {...props}
      ref={ref}
    />
  </Form.Group>
))
