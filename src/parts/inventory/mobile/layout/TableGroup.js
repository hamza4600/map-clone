import React from 'react';

// DEPENDENCIES
import { startCase } from 'lodash';

// LOCAL COMPONENTS
import RowSegment from '../../parts/RowSegment';
import TableData from '../../parts/TableData';
import TableGroupHeader from '../../parts/TableGroupHeader';
import TableGroupRow from '../../parts/TableGroupRow';

// STYLES
import styles from './tableGroup.module.scss';

// MAIN COMPONENT
export default ({
  record = {},
  group,
  groupKey,
  ...props
}) => {

  // PROPS
  const columns = [...Object.keys(group.columns).filter(columnKey => group.columns[columnKey].show)];
  const columnGroups = [];
  while (columns.length) {
    columnGroups.push(columns.splice(0, 3));
  }

  // RENDER
  return (
    <div>
      {columnGroups.map((columnGroup, i) => !record[groupKey] ? null : (
        <div key={i}>
          <TableGroupHeader
            className={styles.header}
            title={i === 0 ? group.label || startCase(groupKey) : undefined}
          >
            <RowSegment>
              {columnGroup.map((columnKey, i) => (
                <div
                  key={i}
                  className={styles.label}
                >
                  {group.columns[columnKey].label || startCase(columnKey)}
                </div>
              ))}
            </RowSegment>
          </TableGroupHeader>
          <TableGroupRow className={styles.row}>
            <RowSegment>
              {columnGroup.map((columnKey, i) => (
                <TableData key={i} {...group.columns[columnKey]}>
                  {record[groupKey][columnKey]}
                </TableData>
              ))}
            </RowSegment>
          </TableGroupRow>
        </div>
      ))}
    </div>
  )
}
