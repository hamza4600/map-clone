import React from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { PATHNAMES } from 'pathnames.js';

// FUNCTIONS
import { logOut, makePath } from 'functions.js';

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './footer.module.scss';

// MAIN COMPONENT
export default compose(
  withRouter,
  connect(
    ({
      mobile,
      token
    }) => ({
      mobile,
      token
    })
  )
)(({
  back = makePath(PATHNAMES.login),
  submitLabel = 'Submit',
  // REACT ROUTER
  history,
  // REDUX STATE
  mobile,
  token
}) => (
  <Row className={styles.row}>
    <Col xs sm={9} className={styles.back}>
      <Button
        variant="secondary"
        label={mobile ? undefined : 'Back'}
        sprite={{
          use: 'arrow-left',
          order: 1
        }}
        onClick={!!token ? () => logOut(undefined, false) : undefined}
        to={!token ? back : undefined}
        square={mobile}
        fullWidth={!mobile}
      />
    </Col>
    <Col xs sm={15}>
      <Button.Submit
        variant="accent"
        label={submitLabel}
        icon="arrow-right"
        fullWidth
      />
    </Col>
  </Row>
))
