import React, { useContext } from 'react';

// GLOBAL VARIABLES
import { BUTTON } from 'defaults.js';

// CONTEXT
import { RecordContext } from 'helpers/recordContext';

// LOCAL COMPONENTS
import RecordForm from './RecordForm';
import RecordButton from '../tools/button/RecordButton';

// MAIN COMPONENT
const RecordFooter = props => {

  // CONTEXT
  const { recordID } = useContext(RecordContext) || {};

  // RENDER
  return (
    <RecordForm.Footer>
      <RecordButton.Cancel />
      <RecordButton.Save
        close={!!recordID}
      />
      {!recordID && <>
        <RecordButton.Save
          label="Save and Close"
          icon="x"
        />
        <RecordButton.Save
          label="Save and Add Another"
          icon={BUTTON.add.icon}
          reset
        />
      </>}
    </RecordForm.Footer>
  )
}

// EXPORT
export default RecordFooter;
