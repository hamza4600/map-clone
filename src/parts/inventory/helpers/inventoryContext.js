import React, { createContext, useCallback, useEffect, useMemo } from 'react';

// DEPENDENCIES
import { kebabCase } from 'lodash';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// FUNCTIONS
import { recordActions } from 'actions.js';
import { apiFetch } from 'functions.js';

// GLOBAL VARIABLES
import { ROWS_ON_PAGE, VEHICLE_ISSUES } from 'globals.js';

// CONTEXT
export const InventoryContext = createContext(null);

// MAIN COMPONENT
export const inventoryContext = Component => compose(
  connect(
    ({
      preferences,
      records
    }) => ({
      settings: preferences.inventorySettings,
      records
    }),
    { ...recordActions }
  ),
  withRouter
)(({
  endpoint,
  // REDUX STATE
  settings,
  records,
  // REDUX DISPATCH
  list,
  load,
  append,
  flush,
  // REACT ROUTER
  history,
  location: {
    search
  },
  match: {
    params: {
      range,
      filter,
      pageNumber = 1
    } = {}
  },
  staticContext,
  // REST
  ...props
}) => {

  // FETCH PARAMS
  const params = useMemo(
    () => {
      const {
        rowsOnPage = ROWS_ON_PAGE.default,
        sortKey,
        sortOrder,
        ...searchParams
      } = queryString.parse(search)

      const vehicleIssue = VEHICLE_ISSUES.find(({ label }) => kebabCase(label) === filter) || {};

      return {
        page: parseInt(pageNumber, 10),
        rowsOnPage: parseInt(rowsOnPage, 10),
        sort: sortKey,
        order: sortOrder,
        ageDuration: range,
        issueFilter: vehicleIssue.key,
        ...searchParams
      }
    },
    [pageNumber, search, range, filter]
  )

  // FETCH REQUEST
  const fetchInventory = useCallback(
    () => {

      apiFetch({
        endpoint: endpoint,
        params: params,
        onSuccess: list,
        loadingMessage: 'Loading inventory',
        errorMessage: 'Unable to load inventory.'
      })
    },
    [endpoint, list, params]
  );

  // MOUNT LISTENER
  useEffect(
    fetchInventory,
    [fetchInventory, range, filter]
  )

  // UNMOUNT LISTENER
  useEffect(
    () => flush,
    [flush]
  )

  // RENDER
  return (
    <InventoryContext.Provider value={{
      settings,
      params: {
        ...params,
        page: undefined,
        pageNumber: params.page,
        prevRows: (params.page - 1) * params.rowsOnPage,
        sort: undefined,
        sortKey: params.sort,
        order: undefined,
        sortOrder: params.order
      },
      inventory: records,
      fetchInventory
    }}>
      <Component
        {...props}
      />
    </InventoryContext.Provider>
  )
})
