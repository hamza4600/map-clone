import React from 'react';

// CORE COMPONENTS
import Sprite from 'core/tools/Sprite';

// LOCAL COMPONENTS
import Alert from './prototype/Alert';
import Router from './parts/Router';

// ALERT TYPES
Alert.Loading = ({
  message,
  ...props
}) => (
  <Alert
    {...props}
    message={(<>
      <Sprite.Loader />
      <span className="loading">{message}</span>
    </>)}
  />
)
Alert.Error = ({
  message,
  ...props
}) => (
  <Alert
    {...props}
    variant="danger"
    message={(<>
      <Sprite as={false} use="warning" fill="danger" />
      <span>{message}</span>
    </>)}
  />
)

// CHILD ASSIGNMENT
Alert.Router = Router;

// EXPORT
export default Alert;
