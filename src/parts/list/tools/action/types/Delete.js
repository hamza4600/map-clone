import React, { useCallback, useContext } from 'react';

// DEPENDENCIES
import { startCase } from 'lodash';

// FUNCTIONS
import { apiFetch, doCallback, makePath, modalFunctions } from 'functions.js';

// CONTEXT
import { ListContext } from '../../../helpers/listContext';

// LOCAL COMPONENTS
import Action from '../prototype/Action';

// MAIN COMPONENT
export default ({
  recordID
}) => {

  // CONTEXT
  const { label, endpoint, fetchRecords } = useContext(ListContext) || {};

  // CALLBACKS
  const deleteRecord = useCallback(
    () => {
      apiFetch({
        method: 'DELETE',
        endpoint: makePath(endpoint, recordID),
        loadingMessage: `Deleting ${label.toLowerCase()}...`,
        successMessage: `${startCase(label)} deleted.`,
        errorMessage: `Unable to delete ${label.toLowerCase()}.`,
        successCallback: () => {
          doCallback(fetchRecords);
        }
      })
    },
    [recordID, label, endpoint, fetchRecords]
  )
  const handleClick = useCallback(
    () => {
      modalFunctions.confirmation({
        title: [
          `Are you sure that you want to permanently delete the selected ${label.toLowerCase()}?`,
          <br />,
          'This action cannot be undone.'
        ],
        continueButton: {
          variant: 'danger',
          label: 'Delete',
          icon: 'trash',
          onClick: deleteRecord
        }
      })
    },
    [label, deleteRecord]
  )

  // RENDER
  return (
    <Action
      label="Delete"
      icon="trash"
      onClick={handleClick}
    />
  )
}
