import React, { createContext, useCallback, useEffect } from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// FUNCTIONS
import { recordActions } from 'actions.js';
import { apiFetch, makePath } from 'functions.js';

// CONTEXT
export const RecordContext = createContext(null);

// MAIN COMPONENT
export const recordContext = Component => compose(
  connect(
    ({ record }) => ({ record }),
    { ...recordActions }
  ),
  withRouter
)(({
  label = 'vehicle',
  idKey = 'vehicle_id',
  endpoint,
  // REDUX STATE
  record,
  // REDUX DISPATCH
  list,
  load,
  append,
  flush,
  // REACT ROUTER
  history,
  location,
  match: {
    params: {
      recordID
    }
  },
  staticContext,
  // REST
  ...props
}) => {

  // FETCH REQUEST
  const fetchRecord = useCallback(
    recordID => {
      flush();
      if (!recordID) return;
      apiFetch({
        endpoint: makePath(endpoint, recordID),
        onSuccess: load,
        loadingMessage: `Loading ${label}`,
        errorMessage: `Unable to load ${label}.`
      })
    },
    [label, endpoint, load, flush]
  )

  // MOUNT LISTENER
  useEffect(
    () => {
      fetchRecord(recordID);
    },
    [recordID, fetchRecord]
  )

  // UNMOUNT LISTENER
  useEffect(
    () => flush,
    [flush]
  )

  // RENDER
  return (
    <RecordContext.Provider value={{
      label,
      idKey,
      record,
      recordID,
      fetchRecord
    }}>
      <Component {...props} />
    </RecordContext.Provider>
  )
})
