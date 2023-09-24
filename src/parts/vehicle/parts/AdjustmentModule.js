import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Page from 'parts/page/Page';

// STYLES
import styles from './adjustmentModule.module.scss';

// MAIN COMPONENT
export default ({
  children,
  className,
  columns,
  title,
  size
}) => (
  <Page.Module>
    <Row className={styles.row}>
      <Col className={styles.col}>
        {!!title &&
          <Page.Module.Header>
            {title}
          </Page.Module.Header>
        }
        <div>
          {children}
        </div>
      </Col>
      <Page.Module.Divider vertical />
      <Col className={clsx(
        styles.col,
        styles.additionsDeductions
      )}>
        <Page.Module.Header className={styles.header}>
          Additions / Deductions
        </Page.Module.Header>
      </Col>
    </Row>
  </Page.Module>
)
