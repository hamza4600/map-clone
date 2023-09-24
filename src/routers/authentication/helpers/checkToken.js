import React, { useEffect, useState } from 'react';

// DEPENDENCIES
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// FUNCTIONS
import { apiFetch, getPath } from 'functions.js';

// MAIN COMPONENT
export const checkToken = Component => {
  return compose(
    withRouter
  )(({
    // REACT ROUTER
    history,
    match: {
      params: {
        token
      }
    }
  }) => {

    // STATE
    const [ validToken, validateToken ] = useState();

    // EFFECTS
    useEffect(
      () => {
        if (!token) {
          history.push({
            pathname: getPath('login'),
            state: {
              alerts: [
                {
                  variant: 'success',
                  message: 'Invalid URL.'
                }
              ]
            }
          })
        } else {
          apiFetch({
            method: 'POST',
            endpoint: ENDPOINTS.session.confirmToken,
            params: { token },
            onSuccess: () => validateToken(true),
            onError: () => history.push({
              pathname: getPath('login'),
              state: {
                alerts: [
                  {
                    variant: 'success',
                    message: 'Invalid token.'
                  }
                ]
              }
            }),
            loadingMessage: 'Checking token'
          })
        }
      },
      [token, validateToken, history]
    )

    return validToken ? <Component /> : null;
  })
}
