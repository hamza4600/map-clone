import React from 'react';

// DEPENDENCIES
import { compose } from 'redux';
import { connect } from 'react-redux';

// FUNCTIONS
import { loggedIn } from 'functions.js';

// HELPERS
import { checkScreenSize } from 'helpers/checkScreenSize';
import { getConfiguration } from 'helpers/getConfiguration';

// GLOBAL COMPONENTS
import Interface from 'routers/interface/Interface';
import Authentication from 'routers/authentication/Authentication';

// MAIN COMPONENT
const App = compose(
  checkScreenSize,
  getConfiguration,
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
  configuration,
  user,
  dealership,
  token,
  tokenExp
}) => (
  configuration &&
  (!configuration.two_step_verification || user.verified) &&
  dealership && loggedIn(token, tokenExp)
) ? <Interface /> : <Authentication />)

// EXPORT
export default App;
