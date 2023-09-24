import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// BOOTSTRAP COMPONENTS
import { Card } from 'react-bootstrap';

// STYLES
import styles from './card.module.scss';

// MAIN COMPONENT
const Component = ({
  id,
  className,
  children,
  title,
  headerTools,
}) => (
  <Card
    id={id}
    className={clsx(
      styles.card,
      className
    )}
  >
    <Card.Header className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.tools}>
        {headerTools}
      </div>
    </Card.Header>
    {children}
  </Card>
)

// CHILD COMPONENTS
Component.Divider = ({
  className
}) => (
  <div
    className={clsx(
      styles.divider,
      className
    )}
  />
)

export default Component;
