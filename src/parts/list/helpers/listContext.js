import React, { createContext, useCallback, useEffect, useMemo } from 'react';

// DEPENDENCIES
import queryString from 'query-string';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

// FUNCTIONS
import { recordActions } from 'actions.js';
import { apiFetch, makePath } from 'functions.js';

// CONTEXT
export const ListContext = createContext(null);

// MAIN COMPONENT
export const listContext = Component => {
  return compose(
    connect(
      ({ records }) => ({ records }),
      { ...recordActions }
    ),
    withRouter
  )(({
    label = 'record',
    idKey,
    endpoint,
    columns = () => [],
    actions = () => [],
    // REDUX STATE
    records,
    // REDUX DISPATCH
    list,
    load,
    append,
    flush,
    // REACT ROUTER
    history,
    location: {
      pathname,
      search
    },
    match,
    /*
    match: {
      params: {
        page = 1
      }
    },
    */
    staticContext,
    // REST
    ...props
  }) => {

    // PARAMS MEMO
    const params = useMemo(
      () => {
        const params = queryString.parse(search);

        /*
        if (params.rowsOnPage) params.page = parseInt(page, 10);
        if (params.sortBy) {
          params.sort = params.sortBy;
          params.order = params.sortOrder;
          delete params.sortBy;
          delete params.sortOrder;
        }
        */

        return params;
      },
      [search]
      //[search, page]
    )

    // FETCH CALLBACK
    const fetchRecords = useCallback(
      () => {

        if (!endpoint) return;

        apiFetch({
          method: 'GET',
          endpoint: makePath(endpoint, 'list'),
          params: params,
          onSuccess: list,
          loadingMessage: `Fetching ${label.toLowerCase()}s...`,
          errorMessage: `Unable to fetch ${label.toLowerCase()}s.`,
        })
      },
      [label, endpoint, list, params]
    )

    // LISTENERS
    useEffect(
      () => {
        fetchRecords();
        return flush;
      },
      [fetchRecords, flush]
    )

    // RENDER
    return (
      <ListContext.Provider value={{
        label,
        idKey,
        endpoint,
        params,
        records,
        columns,
        actions,
        fetchRecords
      }}>
        <Component {...props} />
      </ListContext.Provider>
    )
  })
}
