import React, { useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// BOOTSTRAP COMOPNENTS
import { Col, Row } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Badge from '../tools/badge/Badge';
import Format from '../tools/format/Format';

// STYLES
import styles from './listCol.module.scss';

// MAIN COMPONENT
const ListCol = ({
  children,
  className,
  cols,
  label,
  format = 'String',
  badge,
  ...props
}) => {

  // MEMOS
  const Wrapper = useMemo(
    () => {
      switch(true) {
        case !!Badge[badge] :
          return Badge[badge];
        case !!Format[format] :
          return Format[format];
        case format !== false :
          return Format;
        default :
          return ({ children }) => children;
      }
    },
    [format, badge]
  )

  return (
    <Col
      className={clsx(
        styles.container,
        className
      )}
      xs={24}
      {...cols}
    >
      <Row className={styles.row}>
        {label &&
          <Col
            className={styles.label}
            xs={8}
          >
            {label}
          </Col>
        }
        <Col
          className={styles.col}
          xs={!!label ? 16 : 24}
          md={24}
        >
          {<Wrapper {...props}>{children}</Wrapper> || <>&ndash;</>}
        </Col>
      </Row>
    </Col>
  )
}

// EXPORT
export default ListCol;
