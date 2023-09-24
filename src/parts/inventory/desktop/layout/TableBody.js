import React, { useContext } from 'react';

// DEPENDENCIES
import { map } from 'lodash';

// CONTEXT
import { InventoryContext } from '../../helpers/inventoryContext';

// LOCAL COMPONENTS
import FullRow from '../../parts/FullRow';
import TableData from '../../parts/TableData';
import TableGroupColumn from '../../parts/TableGroupColumn';
import TableGroupRow from '../../parts/TableGroupRow';
import Link from '../../tools/Link';

// STYLES
import styles from './tableBody.module.scss';

// MAIN COMPONENT
export default () => {

  // CONTEXT
  const {
    settings,
    inventory: {
      list = []
    }
  } = useContext(InventoryContext) || {};

  // RETURN
  return (
    <div className={styles.body}>
      {list.map((item, i) => {
        const { vehicle_info = {}, ...record } = item || {};
        return (
          <div
            key={i}
            className={styles.container}
          >
            {map(settings, (group, groupKey) => {
              const groupInfo = record[groupKey] || {}
              return !group.show ? null : (
                <TableGroupRow
                  className={styles.row}
                  key={groupKey}
                >
                  <FullRow>
                    {map(group.columns, (column, columnKey) => !column.show ? null : (
                      <TableGroupColumn
                        key={columnKey}
                      >
                        <TableData {...column}>
                          {groupInfo[columnKey]}
                        </TableData>
                      </TableGroupColumn>
                    ))}
                  </FullRow>
                </TableGroupRow>
              )
            })}
            <TableGroupRow className={styles.row}>
              <FullRow>
                <TableGroupColumn>
                  <TableData schema="date">
                    {vehicle_info.delivered_date}
                  </TableData>
                </TableGroupColumn>
                <TableGroupColumn>
                  <TableData schema="dollars">
                    {vehicle_info.actual_sold_price}
                  </TableData>
                </TableGroupColumn>
                <TableGroupColumn>
                  <Link.View {...record} />
                </TableGroupColumn>
                <TableGroupColumn>
                  <Link.AddIMV {...record} />
                </TableGroupColumn>
              </FullRow>
            </TableGroupRow>
          </div>
        )
      })}
    </div>
  )
}
