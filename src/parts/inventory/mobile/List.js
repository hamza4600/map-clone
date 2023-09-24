import React from 'react';

// GLOBAL COMPONENTS
import Page from 'parts/page/Page';

// LOCAL COMPONENTS
import TableBody from './layout/TableBody';
import SummaryHeader from '../parts/SummaryHeader';
import Pagination from '../tools/Pagination';

// MAIN COMPONENT
export default ({
  className
}) => (
  <Page.Index className={className}>
    <SummaryHeader />
    <TableBody />
    <Pagination />
  </Page.Index>
)
