import React, { forwardRef, useCallback, useContext, useMemo, useEffect } from 'react';

// DEPENDENCIES
import { get } from 'lodash';
import { compose } from 'redux';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// CONTEXT
import { UploadContext } from './uploadContext';

export const uploadFormik = Component => compose(
  forwardRef
)((props, ref) => {

  // PROPS
  const {
    name,
    multiple,
    disabled,
    // FORMIK BAG
    form: {
      setFieldValue,
      values,
    }
  } = props;

  // CONTEXT
  const {
    uploads,
    setUploads
  } = useContext(UploadContext) || {};


  // INITIALIZE CONTEXT
  const initialValue = useMemo( // get initial value form Formik form
    () => get(values, name),
    [name, values]
  )
  useEffect( // add uploads from initial value
    () => {
      if (!initialValue) return;
      setUploads(Array.isArray(initialValue) ? initialValue : [initialValue])
    },
    [initialValue, setUploads]
  )

  // UPDATE FORMIK
  const fieldValueElement = useCallback( // format fieldValue element (i.e. as object or string)
    ({ fieldValue, success } = {}) => success ? fieldValue : undefined,
    []
  )
  const fieldValue = useMemo( // check/update fieldValue when uploads change
    () => multiple ? uploads.map(upload => fieldValueElement(upload)).filter(el => el) : fieldValueElement(uploads[0]),
    [uploads, multiple, fieldValueElement]
  )
  useEffect( // update Formik when fieldValue changes
    () => {
      doCallback(setFieldValue, name, fieldValue);
    },
    [name, fieldValue, setFieldValue]
  )

  // RESETTING
  useEffect( // clear uploads when disabling
    () => {
      if (disabled) setUploads([]);
    },
    [disabled, setUploads]
  )

  // RENDER
  return <Component {...props} ref={ref} />;
})
