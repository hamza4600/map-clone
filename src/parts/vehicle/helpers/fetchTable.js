import React, { useCallback, useEffect } from 'react';

// DEPENDENCIES
import { camelCase } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';

// FUNCTIONS
import { tableActions } from 'actions.js';
import { apiFetch } from 'functions.js';

// GLOBAL COMPONENTS
import Sprite from 'core/tools/Sprite';

// MAIN COMPONENT
export const fetchTable = Component => {
  return compose(
    connect(
      ({ tables }) => ({ tables }),
      { ...tableActions }
    )
  )(({
    // REDUX STATE
    tables,
    // REDUX DISPATCH
    load,
    error,
    // REST
    ...props
  }) => {

    // FETCH PARAMS
    const {
      endpoint = props.lookup,
      key = camelCase(endpoint),
      deps = [],
      loadingMessage = 'Loading table data',
      errorMessage = 'Unable to load table data.',
      debug
    } = props.lookupArgs || {};

    // FETCH FUNCTION
    const fetchTable = useCallback(
      () => {

        if (!endpoint) return;

        const args = {
          endpoint: endpoint,
          onSuccess: data => load(key, data),
          onError: () => error(key),
          debug
        }

        apiFetch(args);
      },
      [endpoint, key, debug, load, error]
    )

    // FETCH DEPENDENCY LISTENER
    useEffect(
      fetchTable,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [...deps]
    )

    const message = endpoint && tables[key] instanceof Error ? (
      <div className="d-flex text-danger"><span>ERROR: {errorMessage}</span></div>
    ) : endpoint && tables[key] === undefined ? (
      <div className="d-flex text-muted"><Sprite.Loader />&nbsp;<span className="loading">{loadingMessage}</span></div>
    ) : tables[key] === undefined ? (
      <div className="d-flex text-muted">Coming Soon!</div>
    ) : '';

    return <Component
      {...props}
      rows={tables[key]}
      message={message}
    />;
  })
}
