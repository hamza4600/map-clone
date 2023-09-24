import React, { forwardRef, useEffect, useRef, useState } from 'react';

// LOCAL COMPONENTS
import Feedback from '../../../parts/Feedback';

// MAIN COMPONENT
export const inputFeedback = Component => forwardRef(({
  useFeedback = true,
  ...props
}, ref) => {

  // PROPS
  const {
    form: {
      submitCount,
      isSubmitting
    } = {},
    meta: {
      error,
      touched
    } = {}
  } = props;

  // STATE
  const [ showFeedback, setShow ] = useState(false);

  // REFS
  const prevCount = useRef(0);

  // EFFECTS
  useEffect(
    () => {
      if (submitCount > prevCount.current) {
        if (isSubmitting) return; // Submission still in progress
        prevCount.current = submitCount;
        if (error && useFeedback) setShow(true);
      }
      if (!error) setShow(false);
    },
    [useFeedback, error, submitCount, prevCount, isSubmitting, setShow]
  )

  // RENDER
  return (<>
    <Component
      {...props}
      hasError={!!showFeedback}
      validEntry={!error && !!touched && useFeedback}
      ref={ref}
    />
    {!!showFeedback &&
      <Feedback>{error}</Feedback>
    }
  </>)
})
