import React, { useCallback, useEffect, useState } from 'react';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// FUNCTIONS
import { apiFetch } from 'functions.js';

// MAIN COMPONENT
export const getInventorySummary = Component => props => {

  // STATE
  const [ inventorySummary, loadSummary ] = useState({})

  // CALLBACKS
  const fetchLookup = useCallback(
    () => {
      apiFetch({
        endpoint: ENDPOINTS.lookup.inventorySummary,
        onSuccess: loadSummary,
        onError: () => loadSummary(new Error())
      })
    },
    [loadSummary]
  )

  // EFFECTS
  useEffect(
    () => {
      fetchLookup();
    },
    [fetchLookup]
  )

  return (
    <Component
      inventorySummary={inventorySummary}
      {...props}
    />
  )
}
