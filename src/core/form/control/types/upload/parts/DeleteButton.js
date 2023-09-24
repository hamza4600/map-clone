import React, { useContext, useCallback } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL VARIABLES
import { BUTTON, UPLOAD } from 'defaults.js';

// GLOBAL FUNCTIONS
import { apiFetch, makePath } from 'functions.js';

// CONTEXT
import { UploadContext } from '../helpers/uploadContext';
import { RecordContext } from 'helpers/recordContext';

// CORE COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './deleteButton.module.scss';

// MAIN COMPONENT
const DeleteButton = ({
  className,
  id,
  fieldValue,
  endpoints: {
    delete: endpoint
  } = {},
  keys,
  disabled,
  readonly,
  allowDelete = UPLOAD.allowDelete,
}) => {

  // CONTEXT
  const { recordID } = useContext(RecordContext) || {};
  const {
    processing,
    setDeleting,
    setError,
    removeUpload
  } = useContext(UploadContext) || {};

  // CALLBACKS
  const handleDelete = useCallback(
    () => endpoint ? apiFetch({
      method: 'POST',
      endpoint: makePath(endpoint, recordID),
      params: {
        fileName: keys ? fieldValue[keys.filename] : fieldValue
      },
      errorMessage: 'Unable to delete file.',
      onFetch: () => setDeleting(id),
      onSuccess: () => removeUpload(id),
      onError: () => setError(id)
    }) : removeUpload(id),
    [recordID, id, fieldValue, endpoint, keys, setDeleting, setError, removeUpload]
  )

  // RENDER
  return disabled || (readonly && !allowDelete) ? null : (
    <Button.Link
      className={clsx(
        className,
        styles.button
      )}
      icon={BUTTON.delete.icon}
      onClick={handleDelete}
      disabled={processing}
    />
  )
}

export default DeleteButton;
