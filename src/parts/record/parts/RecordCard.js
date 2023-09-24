import React, { useContext } from 'react';

// DEPENDENCIES
import { startCase } from 'lodash';

// CONTEXT
import { RecordContext } from 'helpers/recordContext';

// GLOBAL COMPONENTS
import Page from 'parts/page/Page';

// MAIN COMPONENT
const RecordCard = props => {

  // CONTEXT
  const { label, recordID } = useContext(RecordContext) || {};

  // RENDER
  return (
    <Page.Card
      title={recordID ? `Edit ${startCase(label)}` : `Add ${startCase(label)}`}
      {...props}
    />
  )
}

// EXPORT
export default RecordCard;
