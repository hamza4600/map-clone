import React, { useEffect } from 'react';

// DEPENDENCIES
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

// MAIN COMPONENT
export const scrollToTop = Component => {
  return compose(
    withRouter
  )(({
    // REACT ROUTER
    history,
    match,
    location: {
      pathname,
      search
    } = {},
    staticContext,
    // REST
    ...props
  }) => {

    // NAVIGATION LISTENER
    useEffect(
      () => {
        document.documentElement.scrollTop = 0
      },
      [pathname, search]
    )

    return <Component {...props} />;
  })
}
