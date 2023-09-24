import React, { useCallback, useContext, useEffect, useRef } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// CONTEXT
import { InventoryContext } from '../../helpers/inventoryContext';

// LOCAL COMPONENTS
import SummaryBody from '../../parts/SummaryBody';
import SummaryHeader from '../../parts/SummaryHeader';

// STYLES
import styles from './summaryColumn.module.scss';

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

  // REFS
  const summary = useRef();

  // CALLBACKS
  const handleScroll = useCallback(
    () => {
      if (summary.current) summary.current.style.marginTop = `-${window.scrollY}px`;
    },
    [summary]
  )

  // EFFECTS
  useEffect(
    () => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    },
    [handleScroll]
  )

  // RETURN
  return (
    <div className={clsx(
      'position-fixed',
      styles.column
    )}>
      <SummaryHeader className={styles.header} />
      <div ref={summary}>
        {list.map((record = {}, i) => (
          <SummaryBody
            key={i}
            className={styles.body}
            number={prevRows + i + 1}
            record={record || {}}
          />
        ))}
      </div>
    </div>
  )
}
