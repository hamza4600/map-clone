import React, { useCallback, useMemo, useEffect } from 'react';

// DEPENDENCIES
import _ from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// FUNCTIONS
import { lookupActions } from 'actions.js';
import { apiFetch } from 'functions.js';

// MAIN COMPONENT
export const getLookupData = (args = {}) => Component => compose(
  connect(
    ({ lookups }) => ({ lookups }),
    { ...lookupActions }
  )
)(({
  // REDUX STATE
  lookups,
  // REDUX DISPATCH
  init,
  load,
  error,
  flush,
  // REST
  ...props
}) => {

  // PROPS
  const {
    lookup,
    lookupParams = '',
    debug
  } = Object.assign({ ...args }, props);

  // CALLBACKS
  const fetchLookup = useCallback(
    lookup => {
      if (!_.isEmpty(lookups[lookup]))
        return;

      apiFetch({
        endpoint: `${ENDPOINTS.lookup[lookup]}${lookupParams}`,
        onFetch: () => init(lookup),
        onSuccess: data => load(lookup, data),
        onError: () => error(lookup),
        debug
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lookups.length, init, load, error, lookupParams, debug]
  )

  // MEMOS
  const lookupData = useMemo(
    () => {
      return Array.isArray(lookup)
        ? lookup.reduce((o, key) => ({ ...o, [key]: lookups[key] }), {})
        : lookups[lookup]
    },
    [lookup, lookups]
  )

  // EFFECTS
  useEffect(
    () => {
      if (!lookup) return;
      if (Array.isArray(lookup)) lookup.forEach(key => fetchLookup(key));
      else fetchLookup(lookup);
    },
    [lookup, fetchLookup]
  )

  return (
    <Component
      lookupData={lookupData}
      {...props}
    />
  )
})
