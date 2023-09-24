import React, { Children, cloneElement } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// BOOTSTRAP COMPONENTS
import { Col as BootstrapCol } from 'react-bootstrap';

// STYLES
import styles from './col.module.scss';

// MAIN COMPONENT
const Col = ({
  children,
  className,
  cols = {},
  xs,
  sm,
  md,
  lg,
  xl,
  ...props
}) => (
  <BootstrapCol
    className={clsx(
      'form-col',
      styles.col,
      className
    )}
    xs={xs}
    sm={sm}
    md={md}
    lg={lg}
    xl={xl}
    {...cols}
  >
    {Children.map(children, (child, i) => !child ? null : cloneElement(child, Object.assign({
      key: i,
      ...props
    }, child.props)))}
  </BootstrapCol>
)

// EXPORT
export default Col;
