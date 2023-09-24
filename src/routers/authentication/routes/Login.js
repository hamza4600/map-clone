import React from 'react';

// DEPENDENCIES
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// FUNCTIONS
import { sessionActions } from 'actions.js';
import { getPath } from 'functions.js';

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import Card from '../parts/Card';

// STYLES
import styles from './login.module.scss';

// MAIN COMPONENT
export default connect(
  null,
  { ...sessionActions }
)(({
  login
}) => (
  <Card
    documentTitle="Login"
    title="Log in to your account"
    message="Please enter your information."
    args={{
      endpoint: ENDPOINTS.session.login,
      onSuccess: login,
      loadingMessage: 'Logging in',
      errorMessage: 'Unable to log in.'
    }}
  >
    <Form.Body.Vertical>
      <Form.Control
        name="username"
        label="Username"
        required
        autoComplete={true}
      />
      <Form.Control
        name="password"
        label="Password"
        type="password"
        required
        autoComplete="current-password"
      />
      <Form.Checklist
        className={styles.rememberMe}
        name="remember-me"
        options={[
          {
            label: 'Remember me',
            value: true
          }
        ]}
      />
    </Form.Body.Vertical>
    <div className={styles.buttons}>
      <Row>
        <Col xs={12}>
          <Button.Submit
            variant="accent"
            label="Log in"
            icon="check"
            fullWidth
          />
        </Col>
        <Col
          className={styles.forgotPassword}
          xs={12}
        >
          <Link
            to={getPath('forgotPassword')}
          >Forgot password?</Link>
        </Col>
      </Row>
      <div className={styles.or}>
        <hr />
        <span>or</span>
        <hr />
      </div>
      <Row>
        <Col xs={24}>
          <Button
            variant="white"
            label="Sign in with Google"
            sprite={{
              as: false,
              use: 'google'
            }}
            onClick={() => null}
            outline
            fullWidth
          />
        </Col>
      </Row>
    </div>
  </Card>
))
