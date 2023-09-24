import React from 'react';

// DEPENDENCIES
import { lowerCase } from 'lodash';

// MAIN COMPONENT
export const getGroup = Component => {
  return ({
    search,
    ...props
  }) => {

    // PROPS
    const { group } = props;
    const columns = Object.keys(group.columns);
    const checkedColumns = columns.filter(columnKey => group.columns[columnKey].show);
    const searchedColumns = columns.filter(columnKey => lowerCase(columnKey).indexOf(lowerCase(search)) >= 0);

    // RENDER
    return  <Component {...props} columns={columns} checkedColumns={checkedColumns} searchedColumns={searchedColumns} />;
  }
}
