import React, { useCallback, useContext, useEffect, useRef } from 'react';

// DEPENDENCIES
import { map, startCase } from 'lodash';

// CONTEXT
import { InventoryContext } from '../../helpers/inventoryContext';

// LOCAL COMPONENTS
import FullRow from '../../parts/FullRow';
import TableGroupColumn from '../../parts/TableGroupColumn';
import TableGroupHeader from '../../parts/TableGroupHeader';

// STYLES
import styles from './tableHeader.module.scss';

// MAIN COMPONENT
export default () => {

  // CONTEXT
  const { settings } = useContext(InventoryContext) || {};

  // REFS
  const header = useRef();

  // CALLBACKS
  const handleScroll = useCallback(
    () => {
      if (header.current) header.current.style.marginLeft = `-${window.scrollX}px`;
    },
    [header]
  )

  // EFFECTS
  useEffect(
    () => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    },
    [handleScroll]
  )

  // RENDER
  return (
    <div className={styles.container} ref={header}>
      {map(settings, (group, groupKey) => !group.show ? null : (
        <TableGroupHeader
          key={groupKey}
          className={styles.header}
          title={group.label || startCase(groupKey)}
        >
          <FullRow>
            {map(group.columns, (column, columnKey) => !column.show ? null : (
              <TableGroupColumn
                key={columnKey}
                className={styles.label}
              >
                {column.label || startCase(columnKey)}
              </TableGroupColumn>
            ))}
          </FullRow>
        </TableGroupHeader>
      ))}
      <TableGroupHeader className={styles.header}>
        <FullRow>
          <TableGroupColumn className={styles.label}>Delivered Date</TableGroupColumn>
          <TableGroupColumn className={styles.label}>Actual Sold Price</TableGroupColumn>
          <TableGroupColumn className={styles.label}>Details</TableGroupColumn>
          <TableGroupColumn className={styles.label}>IMV Pricing</TableGroupColumn>
        </FullRow>
      </TableGroupHeader>
    </div>
  )
}
