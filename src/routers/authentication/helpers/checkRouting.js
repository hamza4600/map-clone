import React from 'react';

// DEPENDENCIES
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { PATHNAMES } from 'pathnames.js';

// FUNCTIONS
import { getPath, timeExpired } from 'functions.js';

// MAIN COMPONENT
export const checkRouting = Component => {
  return compose(
    withRouter,
    connect(
      ({
        configuration,
        user,
        dealership,
        token,
        tokenExp
      }) => ({
        configuration,
        user,
        dealership,
        token,
        tokenExp
      })
    )
  )(({
    // REACT ROUTER
    location,
    // REDUX STATE
    configuration,
    user,
    dealership,
    token,
    tokenExp
  }) => {

    let redirect;
    if (isEmpty(configuration) || !token || timeExpired(tokenExp)) redirect = ['login', 'forgotPassword', 'resetPassword'];
    else if (configuration.two_step_verification && !user.verified) redirect = ['requestCode', 'enterCode'];
    else if (!dealership) redirect = ['chooseStore'];

    if (redirect && redirect.findIndex(el => location.pathname.split('/')[1] === PATHNAMES[el]) < 0)
      return <Redirect to={getPath(redirect[0])} />;

    return <Component />;
  })
}
