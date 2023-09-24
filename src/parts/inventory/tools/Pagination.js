import React, { useCallback, useContext, useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { PATHNAMES } from 'pathnames.js';

// FUNCTIONS
import { makePath } from 'functions.js';

// HELPERS
import { pageNumbers } from '../helpers/pageNumbers';

// CONTEXT
import { InventoryContext } from '../helpers/inventoryContext';

// BOOTSTRAP COMPONENTS
import { Pagination } from 'react-bootstrap';

// CORE COMPONENTS
import Sprite from 'core/tools/Sprite';

// LOCAL COMPONENTS
import SummaryFooter from '../parts/SummaryFooter';

// STYLES
import styles from './pagination.module.scss';

// MAIN COMPONENT
export default compose(
  withRouter,
  pageNumbers
)(({
  // PAGE NUMBERS
  currentPage,
  firstPage,
  middlePages,
  lastPage,
  // REACT ROUTER
  history,
  location,
  match: {
    params: {
      range,
      filter = 'all'
    }
  }
}) => {

  // CONTEXT
  const {
    params: {
      rowsOnPage
    },
    inventory: {
      total
    }
  } = useContext(InventoryContext) || {};

  // CALLBACKS
  const itemPath = useCallback(
    number => `${makePath(PATHNAMES.inventory, range ? `days/${range}` : filter)}page/${number}/${location.search}`,
    [location.search, range, filter]
  )

  // CHILD COMPONENTS
  const Item = useMemo(
    () => ({
      number
    }) => (
      <Pagination.Item
        className={styles.item}
        href={itemPath(number)}
        active={number === currentPage}
      >
        {number}
      </Pagination.Item>
    ),
    [currentPage, itemPath]
  )
  const Ellipsis = useMemo(
    () => () => (
      <Pagination.Item
        className={clsx(
          styles.item,
          styles.ellipsis
        )}
      >
        ...
      </Pagination.Item>
    ),
    []
  )
  const Button = useMemo(
    () => ({
      number,
      icon
    }) => (
      <Pagination.Item
        className={clsx(
          styles.item,
          styles.button
        )}
        href={itemPath(number)}
      >
        <Sprite
          use={icon}
        />
      </Pagination.Item>
    ),
    [itemPath]
  )

  // RENDER
  return (
    <div className={clsx(
      'position-fixed',
      styles.container
    )}>
      <SummaryFooter />
      <div className={styles.dataColumns}>
        {!!total && total > rowsOnPage &&
          <Pagination className={styles.pagination}>
            {currentPage > 1 &&
              <Button
                number={currentPage - 1}
                icon="chevron-left"
              />
            }
            <Item number={firstPage} />
            {middlePages[0] > firstPage + 1 &&
              <Ellipsis />
            }
            {middlePages.map((number, i) => (
              <Item
                key={i}
                number={number}
              />
            ))}
            {middlePages[middlePages.length - 1] < lastPage - 1 &&
              <Ellipsis />
            }
            <Item number={lastPage} />
            {currentPage < lastPage &&
              <Button
                number={currentPage + 1}
                icon="chevron-right"
              />
            }
          </Pagination>
        }
      </div>
    </div>
  )
})
