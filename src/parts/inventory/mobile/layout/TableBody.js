import React, { useContext } from 'react';

// CONTEXT
import { InventoryContext } from '../../helpers/inventoryContext';

// BOOTSTRAP COMPONENTS
import { Accordion } from 'react-bootstrap';

// LOCAL COMPONENTS
import TableEntry from './TableEntry';

// MAIN COMPONENT
export default () => {

  // CONTEXT
  const {
    params: {
      prevRows
    },
    inventory: {
      list = []
    }
  } = useContext(InventoryContext) || {};

  // RETURN
  return (
    <Accordion>
      {list.map((record = {}, i) => (
        <TableEntry
          key={i}
          number={prevRows + i + 1}
          record={record}
        />
      ))}
    </Accordion>
  )
}
