import React, { forwardRef, useCallback, useEffect, useRef } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { PLACEHOLDERS, RICH_TEXT } from 'defaults.js';
import { TINY_MCE_API } from 'globals.js';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// TINYMCE COMPONENT
import { Editor } from '@tinymce/tinymce-react';

// HELPERS
import { formikField } from '../helpers/formik/formikField';
import { inputState } from '../helpers/state/inputState';
import { inputValidation } from '../helpers/state/inputValidation';
import { formCollapse } from '../helpers/layout/formCollapse';
import { formGroup } from '../helpers/layout/formGroup';
import { inputFeedback } from '../helpers/layout/inputFeedback';
import { inputFocus } from '../helpers/state/inputFocus';
import { inputGroup } from '../helpers/layout/inputGroup';
import { inputLabel } from '../helpers/layout/inputLabel';
import { inputText } from '../helpers/layout/inputText';
import { useHidden } from '../helpers/layout/useHidden';

// STYLES
import styles from './richText.module.scss';

// LOCAL VARIABLES
const CONTENT_STYLES = `
html {
  font-size: ${styles.fontSize};
}
#tinymce {
  color: ${styles.color};
  font-family: ${styles.fontFamily};
  font-size: ${styles.inputSize};
  margin: ${styles.inputPadding};
}
#tinymce::before {
  color: ${styles.placeholderColor};
  font-family: ${styles.fontFamily};
  font-size: ${styles.inputSize};
  left: 0;
}
`

// MAIN COMPONENT
const RichText = compose(
  inputValidation,
  formikField,
  inputState,
  useHidden,
  formCollapse,
  formGroup,
  inputLabel,
  inputFeedback,
  inputText,
  inputFocus,
  inputGroup,
  forwardRef
)(({
  name,
  value,
  init = {},
  height,
  onBlur,
  onClick,
  onFocus,
  required,
  disabled,
  readOnly,
  plaintext,
  tabIndex,
  ...props
}, ref) => {

  // PROPS
  const {
    form: {
      setValue
    } = {}
  } = props;

  // CALLBACKS
  const handleEditorChange = useCallback(
    value => {
      doCallback(setValue, name, value)
    },
    [name, setValue]
  )

  // REFS
  const editorRef = useRef();

  // EFFECYS
  useEffect(
    () => {
      if (editorRef.current && value) editorRef.current.setContent(value)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value, editorRef.current]
  )

  // RENDER
  return disabled || readOnly || plaintext ? (
    <div
      className={clsx(
        styles.dummy,
        disabled && styles.disabled,
        readOnly && styles.readOnly,
        plaintext && styles.plaintext
      )}
      dangerouslySetInnerHTML={{__html:value}}
      ref={ref}
    />
  ) : (
    <div className={styles.editor}>
      <Editor
        apiKey={TINY_MCE_API}
        init={{
          branding: false,
          menubar: false,
          statusbar: true,
          elementpath: false,
          plugins: RICH_TEXT.plugins,
          toolbar: RICH_TEXT.toolbar,
          content_style: CONTENT_STYLES,
          placeholder: PLACEHOLDERS.textarea,
          height: height || RICH_TEXT.height,
          min_height: height || RICH_TEXT.height,
          setup: editor => {
            editorRef.current = editor;
          },
          ...init
        }}
        initialValue={value}
        onBlur={onBlur}
        onClick={onClick}
        onFocus={onFocus}
        onEditorChange={handleEditorChange}
        required={required}
        tabIndex={tabIndex}
        disabled={disabled}
        ref={ref}
      />
    </div>
  )
})

// EXPORT
export default RichText;
