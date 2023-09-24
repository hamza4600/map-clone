import React, { useCallback, useEffect } from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { compose } from 'redux';

// FUNCTIONS
import { recordActions } from 'actions.js';
import { apiFetch, makePath } from 'functions.js';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// MAIN COMPONENT
export const getIMVPricing = Component => compose(
  connect(
    ({ record }) => ({ record }),
    { ...recordActions }
  )
)(({
  // REDUX
  record: {
    vehicle_id,
    imvPricing
  },
  // REDUX DISPATCH
  list,
  load,
  append,
  flush,
  // REST
  ...props
}) => {

  // FETCH REQUEST
  const fetchIMVPricing = useCallback(
    recordID => {
      if (!recordID) return;
      apiFetch({
        endpoint: makePath(ENDPOINTS.vehicle.steps.IMVPricing, recordID),
        onSuccess: data => append(data, 'imvPricing'),
        errorMessage: 'Unable to load IMV Pricing info.'
      })
    },
    [append]
  )

  // MOUNT LISTENER
  useEffect(
    () => {
      if (vehicle_id && !imvPricing) fetchIMVPricing(vehicle_id);
    },
    [vehicle_id, imvPricing, fetchIMVPricing]
  )

  // RENDER
  return <Component {...props} />
})
