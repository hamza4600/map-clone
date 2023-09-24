import React, { createContext, useCallback, useEffect } from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// FUNCTIONS
import { recordActions } from 'actions.js';
import { apiFetch } from 'functions.js';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// CONTEXT
export const VehicleContext = createContext(null);

// MAIN COMPONENT
export const getVehicle = Component => compose(
  connect(
    null,
    { ...recordActions }
  ),
  withRouter
)(({
  // REDUX DISPATCH
  list,
  load,
  append,
  flush,
  // REST
  ...props
}) => {

  // PROPS
  const {
    match: {
      params: {
        recordID
      }
    }
  } = props;

  // FETCH REQUEST
  const fetchVehicle = useCallback(
    recordID => {
      flush();
      if (!recordID) return;
      apiFetch({
        endpoint: ENDPOINTS.vehicle.get(recordID),
        onSuccess: load,
        loadingMessage: 'Loading vehicle info',
        errorMessage: 'Unable to load vehicle info.'
      })
    },
    [load, flush]
  )

  // MOUNT LISTENER
  useEffect(
    () => {
      fetchVehicle(recordID);
    },
    [recordID, fetchVehicle]
  )

  // UNMOUNT LISTENER
  useEffect(
    () => flush,
    [flush]
  )

  // SUCCESS CALLBACK
  const refreshVehicle = useCallback(
    recordID => fetchVehicle(recordID),
    [fetchVehicle]
  )

  // RENDER
  return (
    <VehicleContext.Provider value={{
      refreshVehicle
    }}>
      <Component {...props} />
    </VehicleContext.Provider>
  )
})
