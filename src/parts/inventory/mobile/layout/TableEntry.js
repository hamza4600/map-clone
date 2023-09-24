import React, { useCallback, useContext, useRef } from 'react';

// DEPENDENCIES
import { map } from 'lodash';

// CONTEXT
import { InventoryContext } from '../../helpers/inventoryContext';

// BOOTSTRAP COMPONENTS
import { Accordion } from 'react-bootstrap';
import AccordionContext from 'react-bootstrap/AccordionContext';

// LOCAL COMPONENTS
import EntryFooter from './EntryFooter';
import TableGroup from './TableGroup';
import SummaryBody from '../../parts/SummaryBody';

// STYLES
import styles from './tableEntry.module.scss';

// MAIN COMPONENT
export default ({
  record = {},
  number,
}) => {

  // CONTEXT
  const { settings } = useContext(InventoryContext) || {};
  const currentActiveKey = useContext(AccordionContext);

  // REFS
  const entry = useRef(undefined)

  // ENTER HANDLER
  const handleEntered = useCallback(
    () => {
      if (!entry.current) return;
      const main = document.getElementsByTagName("MAIN")[0];
      window.scrollTo({
        top: entry.current.offsetTop + main.offsetTop - 65 + 1,
        behavior: 'smooth',
      })
    },
    [entry]
  )

  // RENDER
  return (
    <div
      className={styles.entry}
      ref={entry}
    >
      <SummaryBody
        active={number === currentActiveKey}
        number={number}
        record={record || {}}
      />
      <Accordion.Collapse
        eventKey={number}
        onEntered={handleEntered}
      >
        <div>
          <hr className={styles.hr} />
          {map(settings, (group, groupKey) => !group.show ? null : (
            <TableGroup
              key={groupKey}
              record={record}
              group={group}
              groupKey={groupKey}
            />
          ))}
          <EntryFooter
            record={record}
          />
        </div>
      </Accordion.Collapse>
    </div>
  )
}
