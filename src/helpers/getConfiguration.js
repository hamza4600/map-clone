import React, { useEffect } from 'react';

// DEPENDENCIES
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL VARIABLES
//import { ENDPOINTS } from 'endpoints.js';

// FUNCTIONS
import { configurationActions } from 'actions.js';
//import { alertFunctions, apiFetch } from 'functions.js';

// MAIN COMPONENT
export const getConfiguration = Component => {
  return compose(
    connect(
      ({ configuration }) => ({ configuration }),
      { ...configurationActions }
    )
  )(({
    configuration,
    setConfiguration,
    clearConfiguration
  }) => {

    // API FETCH
    useEffect(
      () => {
        // MOCK FETCH
        if (isEmpty(configuration)) setConfiguration({
          version: '2.0.0',
//          two_step_verification: true
        })
        /*
        if (isEmpty(configuration)) apiFetch({
          method: 'POST',
          endpoint: ENDPOINTS.session.getConfiguration,
          onSuccess: setConfiguration,
          loadingMessage: 'Configuring application',
          errorMessage: 'Unable to configure application.',
          messageFunctions: alertFunctions,
          debug: false
        })
        */
      },
      [configuration, setConfiguration]
    )

    return <Component />;
  })
}
