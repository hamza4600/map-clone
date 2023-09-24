import React, { createContext, forwardRef, useCallback, useState } from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';
import { PATHNAMES } from 'pathnames.js';

// FUNCTIONS
import { sessionActions } from 'actions.js';
import { apiFetch, makePath } from 'functions.js';

// CONTEXT
export const DealershipContext = createContext(null);

// MAIN COMPONENT
export const dealershipContext = Component => {
  return compose(
    connect(
      null,
      { setDealership: sessionActions.setDealership }
    ),
    withRouter,
    forwardRef
  )(({
    // REDUX DISPATCH
    setDealership,
    // REACT ROUTER
    history,
    location,
    match,
    staticContext,
    // REST
    ...props
  }, ref) => {

    // FETCH STATE
    const [ fetching, setFetching ] = useState(false);

    // SELECTION HANDLER
    const chooseStore = useCallback(
      dealership_store_id => {

        apiFetch({
          method: 'POST',
          endpoint: ENDPOINTS.session.chooseStore,
          params: {
            dealership_store_id
          },
          onFetch: () => {
            setFetching(true)
          },
          onResponse: () => {
            setFetching(false)
          },
          onSuccess: response => {
            history.push(makePath(PATHNAMES.inventory))
            setDealership(response)
          },
          errorMessage: 'Unable to change dealership.'
        })
      },
      [history, setDealership, setFetching]
    )

    // RENDER
    return (
      <DealershipContext.Provider value={{
        chooseStore,
        fetching
      }}>
        <Component {...props} ref={ref} />
      </DealershipContext.Provider>
    )
  })
}
