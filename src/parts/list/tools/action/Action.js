import React from 'react';

// LOCAL COMPONENTS
import Delete from './types/Delete';
import Link from './types/Link';

// MAIN COMPONENT
const Action = {
  Delete,
  // STEP BUTTONS
  Edit: props => (
    <Link
      path="edit"
      label="Edit"
      icon="edit"
      {...props}
    />
  )
}

// EXPORT
export default Action
