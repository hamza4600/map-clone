import React, { createContext, forwardRef, useMemo, useReducer } from 'react';

// DEPENDENCIES
import { findIndex } from 'lodash';
import { compose } from 'redux';

// GLOBAL FUNCTIONS
import { randomID } from 'functions.js';

// CONTEXT EXPORT
export const UploadContext = createContext(null);

// REDUCER
const reducer = (state, { type, uploads, upload, ...action }) => {

  const newState = [...state];
  const uploadIndex = findIndex(newState, ({ id }) => id === action.id);

  switch (type) {

    case 'setUploads':
      return uploads;

    case 'addUpload':
      if (!action.multiple) return [{
        ...upload,
        uploading: true
      }]
      const count = newState.filter(({ name }) => name === upload.name).length;
      newState.push({
        ...upload,
        name: count ? `${upload.name} (${count})` : upload.name,
        uploading: true
      })
      return newState;

    case 'removeUpload':
      if (uploadIndex < 0) return state;
      newState.splice(uploadIndex, 1);
      return newState;

    case 'updateUpload':
      if (uploadIndex < 0) return state;
      newState[uploadIndex] = {
        ...newState[uploadIndex],
        ...action
      }
      return newState;

    default:
      throw new Error();
  }
}

// MAIN COMPONENET
export const uploadContext = Component => compose(
  forwardRef
)((props, ref) => {

  // PROPS
  const { keys, multiple } = props;

  // STATE
  const [ uploads, updateContext ] = useReducer(reducer, []);

  // MEMOS
  const processing = useMemo(
    () => {
      uploads.forEach(({ uploading, deleting }) => {
        if (uploading || deleting) return true;
      })
    },
    [uploads]
  )

  // REDUCERS
  const reducers = useMemo(
    () => ({
      setUploads: uploads => updateContext({
        type: 'setUploads',
        uploads: uploads.map(upload => ({
          id: randomID(),
          name: keys ? upload[keys.filename] : upload,
          fieldValue: upload,
          success: true
        }))
      }),
      addUpload: (id, name) => updateContext({
        type: 'addUpload',
        upload: {
          id,
          name
        },
        multiple
      }),
      removeUpload: id => updateContext({
        type: 'removeUpload',
        id
      }),
      setDeleting: id => updateContext({
        type: 'updateUpload',
        deleting: true,
        id
      }),
      setError: id => updateContext({
        type: 'updateUpload',
        uploading: false,
        error: true,
        id
      }),
      setSuccess: (id, fieldValue) => updateContext({
        type: 'updateUpload',
        uploading: false,
        success: true,
        fieldValue,
        id
      })
    }),
    [updateContext, keys, multiple]
  )

  // RENDER
  return (
    <UploadContext.Provider value={{
      uploads,
      processing,
      ...reducers
    }}>
      <Component {...props} ref={ref} />
    </UploadContext.Provider>
  )
})
