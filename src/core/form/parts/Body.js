import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// LOCAL COMPONENTS
import Row from '../parts/Row';

// STYLES
import styles from './body.module.scss';

// MAIN COMPONENT
const Body = ({
  children,
  className,
  ...props
}) => (
  <Row
    className={clsx(
      'form-body',
      styles.body,
      props.vertical && styles.vertical,
      className
    )}
    {...props}
  >
    {children}
  </Row>
)

Body.Inline = props => <Body inline {...props} className={clsx( 'form-inline', styles.inline, props.className )} />;
Body.Vertical = props => <Body vertical {...props} className={clsx( 'form-vertical', styles.vertical, props.className )} />;
Body.Columns = props => <Body columns {...props} className={clsx( 'form-columns', styles.columns, props.className )} />;

// EXPORT
export default Body;
