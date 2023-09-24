import React, { useContext, useMemo } from 'react';

// CONTEXT
import { InventoryContext } from '../helpers/inventoryContext';

// MAIN COMPONENT
export const pageNumbers = Component => props => {

  // CONTEXT
  const {
    params: {
      pageNumber,
      rowsOnPage
    },
    inventory: {
      total = 0
    }
  } = useContext(InventoryContext) || {};

  // VARIABLES
  const currentPage = useMemo(
    () => parseInt(pageNumber, 10),
    [pageNumber]
  )
  const firstPage = useMemo(
    () => 1,
    []
  )
  const lastPage = useMemo(
    () => Math.ceil(total/rowsOnPage),
    [total, rowsOnPage]
  )
  const middlePages = useMemo(
    () => {
      const middlePages = [];
      if (currentPage - 3 > firstPage && currentPage === lastPage) middlePages.push(currentPage - 3);
      if (currentPage - 2 > firstPage && currentPage > lastPage - 2) middlePages.push(currentPage - 2);
      if (currentPage - 1 > firstPage) middlePages.push(currentPage - 1);
      if (currentPage !== firstPage && currentPage !== lastPage) middlePages.push(currentPage);
      if (currentPage + 1 < lastPage) middlePages.push(currentPage + 1);
      if (currentPage + 2 < lastPage && currentPage < firstPage + 2) middlePages.push(currentPage + 2);
      if (currentPage + 3 < lastPage && currentPage === firstPage) middlePages.push(currentPage + 3);
      return middlePages;
    },
    [currentPage, firstPage, lastPage]
  )

  // RENDER
  return (
    <Component
      {...props}
      currentPage={currentPage}
      firstPage={firstPage}
      middlePages={middlePages}
      lastPage={lastPage}
    />
  )
}
