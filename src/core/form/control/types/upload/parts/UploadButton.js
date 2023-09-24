import React, { useCallback, useContext } from 'react';

// DEPENDENCIES
import { each, isEmpty, isObject } from 'lodash';
import { useDropzone } from 'react-dropzone';

// GLOBAL VARIABLES
import { UPLOAD } from 'defaults.js';

// GLOBAL FUNCTIONS
import { apiFetch, doCallback, makePath, randomID } from 'functions.js';

// CONTEXT
import { UploadContext } from '../helpers/uploadContext';
import { RecordContext } from 'helpers/recordContext';

// CORE COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './uploadButton.module.scss';

// MAIN COMPONENT
const UploadButton = ({
  name,
  button,
  endpoint,
  endpoints = UPLOAD.endpoints || {},
  accept = UPLOAD.accept,
  multiple = UPLOAD.multple,
  onSuccess,
  fieldValueKey = {},
  disabled,
  readonly,
  debug,
  // FORMIK BAG
  form: {
    setFieldTouched
  },
}) => {

  // CONTEXT
  const { recordID } = useContext(RecordContext) || {};
  const {
    processing,
    uploads,
    addUpload,
    setSuccess,
    setError
  } = useContext(UploadContext) || {};

  // CALLBACKS
  const uploadFile = useCallback( // Upload file to
    file => {

      const fileID = randomID();

      apiFetch({
        method: 'POST',
        endpoint: endpoint || makePath(endpoints.upload, recordID),
        headers: {
          'Content-Type': file.type,
          'Content-Length': file.size
        },
        body: file,
        queryParams: {
          fileName: file.name
        },
        errorMessage: 'Unable to upload file.',
        onFetch: () => addUpload(fileID, file.name),
        onSuccess: data => {
          let fieldValue = {};
          if (!isObject(fieldValueKey)) {
            fieldValue = data[fieldValueKey];
          } else if (!isEmpty(fieldValueKey)) {
            each(fieldValueKey, key => {
              fieldValue[key] = data[key]
            })
          }
          doCallback(onSuccess, data, file);
          setSuccess(fileID, fieldValue)
        },
        onError: () => setError(fileID),
        debug
      })
    },
    [recordID, endpoint, endpoints, onSuccess, fieldValueKey, addUpload, setSuccess, setError, debug]
  )
  const handleDrop = useCallback(
    files => {
      doCallback(setFieldTouched, name, true);
      files.forEach(file => uploadFile(file));
    },
    [name, setFieldTouched, uploadFile]
  )
  // DROPZONE
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop
  })

  // RENDER
  return (uploads.length > 0 && !multiple) || readonly ? null : (
    <div
      className={styles.container}
      {...getRootProps()}
    >
      <input
        {...getInputProps({
          multiple,
          accept,
          disabled
        })}
      />
      <Button
        className={styles.button}
        variant={UPLOAD.variant}
        label="Upload"
        icon="upload"
        fullWidth={UPLOAD.fullWidth}
        disabled={disabled || processing || (!endpoint && (!endpoints || !recordID))}
        {...button}
      />
    </div>
  )
}

export default UploadButton;
