import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { COPYRIGHT, VERSION } from 'globals.js';

// FUNCTIONS
import { alertFunctions, getPath } from 'functions.js';

// HELPERS
import { documentTitle } from 'helpers/documentTitle';
import { scrollToTop } from 'helpers/scrollToTop';

// BOOTSTRAP COMPONENTS
import { Card, Container } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Alert from 'core/tools/alert/Alert';
import Image from 'core/tools/Image';

// STYLES
import styles from './card.module.scss';

// MAIN COMPONENT
export default compose(
  documentTitle,
  scrollToTop
)(({
  children,
  title,
  message,
  onSubmit,
  args
}) => (
  <Card
    className={clsx(
      'theme-dark', // Custom Class
      styles.card
    )}
  >
    <Card.Header className={styles.header}>
      <Container>
        <Image.Logo
          className={styles.logo}
          fill="accent"
        />
        <h1 className={styles.title}>{title}</h1>
        {[].concat(Array.isArray(message) ? message : [message]).map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </Container>
    </Card.Header>
    <Card.Body className={styles.body}>
      <Container>
        <Alert.Router
          className={styles.alerts}
          limit="1"
        />
        <Form
          messageFunctions={alertFunctions}
          onSubmit={onSubmit}
          {...args}
        >
          {children}
        </Form>
      </Container>
    </Card.Body>
    <Card.Footer className={styles.footer}>
      <Container>
        <p className={styles.terms}>
          <Link to={getPath('terms')}>Terms of Service</Link>
        </p>
        <p className={styles.copyright}>
          <span>{COPYRIGHT}</span>
          <span>v{VERSION} | {new Date().getFullYear()}</span>
        </p>
      </Container>
    </Card.Footer>
  </Card>
))
