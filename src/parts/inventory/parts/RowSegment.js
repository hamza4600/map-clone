import React, { Children } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

// STYLES
import styles from './rowSegment.module.scss';

// MAIN COMPONENT
export default ({
  children,
  className,
  columns = 3
}) => (
  <Row className={clsx(
    styles.row,
    className
  )}>
    {Children.map(children, (child, i) => (
      <Col xs={24/columns}>
        {child}
      </Col>
    ))}
  </Row>
)
