import React, { forwardRef, useEffect, useRef } from 'react';

// DEPENDENCIES
import { isEmpty } from 'lodash';

// GLOBAL VARIABLES
import { TIMES } from 'globals.js';

// GLOBAL FUNCTIONS
// import { doCallback, modalFunctions } from 'functions.js';

// LOCAL FUNCTIONS
const scrollToError = () => {
  let scroll;
  const siteHeader = document.getElementById('site-header') || {};
  const headerBuffer = siteHeader.clientHeight || 0;
  const controlErrors = [].slice.call(document.getElementsByClassName('form-control-error'));
  controlErrors.forEach(control => {
    if (!scroll || scroll > control.getBoundingClientRect().top) {
      scroll = control.getBoundingClientRect().top;
    }
  });
  window.scrollTo({
    top: scroll + window.scrollY - headerBuffer - 60,
    behavior: 'smooth'
  });
}

// MAIN FUNCTIONS
export const formError = Component => forwardRef(({
  // messageFunctions = modalFunctions,
  forwardedRef,
  ...props
}, ref) => {

  // FORMIK CONTEXT
  const { errors, submitCount, isSubmitting } = props.form || {};

  // REFS
  const prevCount = useRef(0);

  // MESSAGE EFFECT
  useEffect(
    () => {
      if (submitCount === prevCount.current) return; // No new submit
      if (isSubmitting) return; // Submission still in progress
      prevCount.current = submitCount; // Track new submit
      if (isEmpty(errors)) return; // No errors
      // const removeError = messageFunctions.error('Check invalid fields.');
      setTimeout(scrollToError, TIMES.transitionDuration);
      // return () => doCallback(removeError);
    },
    [errors, submitCount, prevCount, isSubmitting]
  )

  // RENDER
  return <Component {...props} ref={ref} />;
})
