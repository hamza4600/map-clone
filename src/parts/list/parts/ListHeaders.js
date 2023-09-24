import React, { useContext } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// CONTEXT
import { ListContext } from '../helpers/listContext.js';

// BOOTSTRAP COMOPNENTS
import { Col, Row } from 'react-bootstrap';

// STYLES
import styles from './listHeaders.module.scss';

// MAIN COMPONENT
const ListHeaders = () => {

  // CONTEXT
  const { columns, actions } = useContext(ListContext) || {};

  // RENDER
  return !columns ? null : (
    <div className={styles.header}>
      <Row className={styles.innerRow}>
        <Col
          className={clsx(
            styles.col,
            styles.number
          )}
        >#</Col>
        <Col className={styles.cols}>
          <Row className={styles.innerRow}>
            {columns({}).map(({ props: { className, label, cols } }, i) => (
              <Col
                key={i}
                className={clsx(
                  styles.col,
                  className
                )}
                {...cols}
              >
                {label}
              </Col>
            ))}
          </Row>
        </Col>
        {actions({}).length > 0 &&
          <Col className={clsx(
            styles.col,
            styles.actions,
            styles[`actions-${actions({}).length}`]
          )} />
        }
      </Row>
    </div>
  )
}

// EXPORT
export default ListHeaders;
