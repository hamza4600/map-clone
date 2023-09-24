import React, { cloneElement, useContext } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// CONTEXT
import { ListContext } from '../helpers/listContext.js';

// BOOTSTRAP COMOPNENTS
import { Col, Row } from 'react-bootstrap';

// STYLES
import styles from './listRow.module.scss';

// MAIN COMPONENT
const ListRow = ({
  rowID,
  record,
  recordID
}) => {

  // CONTEXT
  const { columns, actions } = useContext(ListContext) || {};

  // RENDER
  return !columns || !record ? null : (
    <div className={styles.row}>
      <div className={styles.inner}>
        <Row className={styles.innerRow}>
          <Col className={clsx(
            styles.col,
            styles.number
          )}>
            {rowID}
          </Col>
          <Col className={styles.cols}>
            <Row className={styles.innerRow}>
              {columns(record).map((column, i) => cloneElement(column, {
                key: i
              }))}
            </Row>
          </Col>
          {actions({}).length > 0 &&
            <Col className={clsx(
              styles.col,
              styles.actions,
              styles[`actions-${actions({}).length}`]
            )}>
              {actions(record).map((action, i) => cloneElement(action, {
                key: i,
                record,
                recordID
              }))}
            </Col>
          }
        </Row>
      </div>
    </div>
  )
}

// EXPORT
export default ListRow;
