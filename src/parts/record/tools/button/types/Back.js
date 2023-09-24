import React, { useContext } from 'react';

// FUNCTIONS
import { makePath } from 'functions.js';

// CONTEXT
import { RecordContext } from 'helpers/recordContext';
import { RecordFormContext } from '../../../parts/RecordForm';

// LOCAL COMPONENTS
import Cancel from './Cancel';

// MAIN COMPONENT
const Back = ({
  to,
  ...props
}) => {

  // CONTEXT
  const { recordID } = useContext(RecordContext) || {};
  const { redirect = to } = useContext(RecordFormContext) || {};

  // RENDER
  return (
    <Cancel
      label="Previous"
      sprite={{
        use:   'arrow-left',
        order: 1
      }}
      modal={{
        title: `Are you sure you want to go back?`,
      }}
      to={makePath(redirect, recordID)}
      {...props}
    />
  )
}

// EXPORT
export default Back
