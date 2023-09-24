import React, { createContext, forwardRef, useCallback, useEffect, useMemo, useReducer } from 'react';

// DEPENDENCIES
import { isEqual } from 'lodash';

// GLOBAL FUNCTIONS
import { apiFetch, bugLog, modalFunctions } from 'functions.js';

// CONTEXT EXPORT
export const FormArgsContext = createContext(null);

// REDUCER
const reducer = (state, {type, args = {}}) => {
  switch (type) {
    case 'updateArgs':
      return {
        ...state,
        ...args
      }
    case 'resetArgs':
      return isEqual(state, args) ? state : {
        ...args
      }
    default:
      throw new Error();
  }
}

// MAIN COMPONENT
export const formSubmit = Component => forwardRef(({
  confirmation,
  onSubmit,
  method = 'POST',
  endpoint,
  token,
  onFetch,
  onResponse,
  onSuccess,
  onError,
  loadingMessage,
  successMessage,
  errorMessage,
  messageFunctions,
  ...props
}, ref) => {

  // PROPS
  const {
    debugOnly,
    debug,
  } = props;

  // MEMOS
  const init = useMemo(
    () => ({
      method,
      endpoint,
      token,
      onFetch,
      onResponse,
      onSuccess,
      onError,
      loadingMessage,
      successMessage,
      errorMessage,
      messageFunctions,
      debugOnly,
      debug
    }),
    [method, endpoint, token, onFetch, onResponse, onSuccess, onError, loadingMessage, successMessage, errorMessage, messageFunctions, debugOnly, debug]
  )

  // STATE
  const [ args, argsReducer ] = useReducer(reducer, init);

  // CALLBACKS
  const updateArgs = useCallback(
    args => {
      argsReducer({
        type: 'updateArgs',
        args
      })
    },
    [argsReducer]
  )
  const resetArgs = useCallback(
    () => {
      argsReducer({
        type: 'resetArgs',
        args: init
      })
    },
    [init, argsReducer]
  )
  const submitForm = useCallback(
    values => {
      bugLog(values, debug);
      if (onSubmit) onSubmit(values, args);
      else apiFetch({
        params: values,
        ...args
      })
    },
    [args, onSubmit, debug]
  )
  const handleSubmit = useCallback(
    values => {
      if (confirmation) modalFunctions.add({
        type: 'confirmation',
        ...confirmation,
        continueButton: Object.assign({
          onClick: () => submitForm(values)
        }, confirmation.continueButton)
      })
      else submitForm(values);
    },
    [confirmation, submitForm]
  )

  // EFFECTS
  useEffect(
    () => {
      resetArgs();
    },
    [resetArgs]
  )

  // RENDER
  return (
    <FormArgsContext.Provider value={{
      args,
      updateArgs,
      resetArgs
    }}>
      <Component
        {...props}
        onSubmit={handleSubmit}
        messageFunctions={messageFunctions}
        ref={ref}
      />
    </FormArgsContext.Provider>
  )
})
