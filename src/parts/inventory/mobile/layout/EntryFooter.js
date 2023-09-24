import React from 'react';

// LOCAL COMPONENTS
import RowSegment from '../../parts/RowSegment';
import TableData from '../../parts/TableData';
import TableGroupHeader from '../../parts/TableGroupHeader';
import TableGroupRow from '../../parts/TableGroupRow';
import Link from '../../tools/Link';

// STYLES
import styles from './tableGroup.module.scss';

// MAIN COMPONENT
export default ({
  record: {
    vehicle_info,
    ...record
  } = {
    vehicle_info: {}
  }
}) => (
  <div>
    <div>
      <TableGroupHeader className={styles.header}>
        <RowSegment>
          <div className={styles.label}>Delivered Date</div>
          <div className={styles.label}>Actual Sold Price</div>
          <div className={styles.label}>Details</div>
        </RowSegment>
      </TableGroupHeader>
      <TableGroupRow className={styles.row}>
        <RowSegment>
          <TableData schema="date">
            {vehicle_info.delivered_date}
          </TableData>
          <TableData schema="dollars">
            {vehicle_info.actual_sold_price}
          </TableData>
          <Link.View {...record} />
        </RowSegment>
      </TableGroupRow>
    </div>
    <div>
      <TableGroupHeader className={styles.header}>
        <RowSegment>
          <div className={styles.label}>IMV Pricing</div>
        </RowSegment>
      </TableGroupHeader>
      <TableGroupRow className={styles.row}>
        <RowSegment>
          <Link.AddIMV {...record} />
        </RowSegment>
      </TableGroupRow>
    </div>
  </div>
)
