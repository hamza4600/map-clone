import React, { createContext, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';

// DEPENDENCIES
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// CONTEXT
export const SearchContext = createContext(null);

// MAIN COMPONENT
export const searchContext = Component => {
  return compose(
    withRouter,
    forwardRef
  )(({
    name = 'searchKeyword',
    // REACT ROUTER
    history,
    location,
    match,
    staticContext,
    // REST
    ...props
  }, ref) => {

    // REFS
    const controlRef = useRef();

    // STATE
    const [show, setShow] = useState(false);

    // MEMOS
    const value = useMemo(
      () => queryString.parse(location.search)[name],
      [name, location.search]
    )

    // CALLBACKS
    const handleSubmit = useCallback(
      values => {
        history.push({
          pathname: location.pathname,
          search: '?' + queryString.stringify({
            ...queryString.parse(location.search),
            ...values
          })
        })
      },
      [history, location]
    )
    const handleClick = useCallback(
      () => {
        setShow(!show)
        if (!show && controlRef.current) controlRef.current.focus();
        if (show && value) handleSubmit({
          [name]: undefined
        })
      },
      [name, value, controlRef, show, setShow, handleSubmit]
    )

    // EFFECTS
    useEffect(
      () => {
        if (value) setShow(true)
      },
      [value, setShow]
    )

    // RENDER
    return (
      <SearchContext.Provider value={{
        value,
        controlRef,
        show,
        setShow,
        handleClick,
        handleSubmit
      }}>
        <Component
          {...props}
          ref={ref}
        />
      </SearchContext.Provider>
    )
  })
}
