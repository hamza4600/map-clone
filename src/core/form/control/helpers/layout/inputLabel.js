import React, { forwardRef } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// LOCAL COMPONENTS
import Col from '../../../parts/Col';
import Label from '../../../parts/Label';
import Row from '../../../parts/Row';

// STYLES
import styles from './inputLabel.module.scss';

// MAIN COMPONENT
export const inputLabel = Component => forwardRef(({
  children,
  label,
  justify,
  ...props
}, ref) => (
    <Row
      className={clsx(
        styles[justify],
        props.fullWidth && styles.fullWidth
      )}
    >
      <Label
        {...props}
        cols={justify === 'right' ? {
          xs: 24,
          md: true
        } : undefined} // Unset form control cols
        {...(typeof label === 'object' ? label : {
          label
        })}
      />
      <Col>
        <Component {...props} children={children} ref={ref} />
      </Col>
    </Row>
))
