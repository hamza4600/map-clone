import React, { createContext, forwardRef, useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
//import React, { createContext, forwardRef, useCallback, useEffect, useReducer, useRef } from 'react';

// DEPENDENCIES
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { createPopper } from '@popperjs/core';

// GLOBALS
import { DROPDOWN } from 'defaults.js';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// CONTEXT EXPORT
export const DropdownContext = createContext(null);

// LOCAL FUNCTIONS
const isFixed = el => {
  let fixed = false;
  do { if (getComputedStyle(el).getPropertyValue('position') === 'fixed') fixed = true; el = el.offsetParent; } while (el);
  return fixed;
}
const getOffset = el => {
  let top = 0;
  do { top += el.offsetTop || 0; el = el.offsetParent; } while(el);
  return top;
};
const visibleStart = el => isFixed(el) ? 0 : window.pageYOffset;
const visibleEnd = el => window.innerHeight + visibleStart(el);
const getContainerHeight = el => isFixed(el) ? window.innerHeight : window.innerHeight + window.pageYOffset;

// INIT/REDUCER
const INIT = {
  show: false,
  height: undefined,
  position: undefined,
  alignment: undefined
}
const reducer = (state, { type, ...action }) => {
  switch (type) {
    case 'setShow':
      const { show } = action;
      return {
        ...state,
        show
      }
    case 'setHeight':
      const { height } = action;
      return {
        ...state,
        height
      }
    case 'setPlacement':
      const { placement } = action;
      return {
        ...state,
        position: placement.split('-')[0],
        alignment: placement.split('-')[1]
      }
    default:
      throw new Error();
  }
}

// MAIN COMPONENT
export const dropdownContext = Component => {
  return compose(
    withRouter,
    forwardRef
  )(({
    align = DROPDOWN.align,
    onShow,
    // ROUTER
    history,
    location,
    match,
    staticContext,
    // REST
    ...props
  }, ref) => {

    // STATE
    const [ context, updateContext ] = useReducer(reducer, INIT);
    const { show, position } = context;

    // REFS
    const outerRef = useRef();
    const innerRef = useRef();
    const toggleRef = useRef();
    const popoverRef = useRef();

    // CALLBACKS
    const setShow = useCallback(
      show => {
        updateContext({
          type: 'setShow',
          show
        })
      },
      [updateContext]
    )
    const hideDropdown = useCallback(
      () => {
        setShow(false)
      },
      [setShow]
    )
    const clickLocator = useCallback(
      e => {
        if (outerRef.current && !outerRef.current.contains(e.target)) hideDropdown() // close dropdown when clicking outsie the box
      },
      [hideDropdown]
    )
    const keyListener = useCallback(
      e => {
        const keys = [9, 13, 27]; // [tab, return, escape]
        if (keys.indexOf(e.keyCode) > -1) hideDropdown(); // close dropdown on whitelisted key clicks
      },
      [hideDropdown]
    )
    const checkVisible = useCallback(
      () => {
        const el = outerRef.current;
        if (!el) return;
        if (visibleEnd(el) < getOffset(el)) hideDropdown(); // element is below visible window
        if (visibleStart(el) > getOffset(el) + el.offsetHeight) hideDropdown(); // element is above visible window
      },
      [outerRef, hideDropdown]
    )
    const setHeight = useCallback(
      position => {
        const outer = outerRef.current;
        const inner = innerRef.current;
        if (!outer || !inner) return;
        updateContext({
          type: 'setHeight',
          height: position === 'bottom' ? getContainerHeight(inner) - getOffset(inner) - outer.clientHeight : undefined
        })
      },
      [outerRef, updateContext]
    )

    // MEMOS
    const popperOptions = useMemo(
      () => ({
        placement: `bottom-${align}`,
        modifiers: [{
          name: 'topLogger',
          enabled: true,
          phase: 'main',
          fn({ state }) {
            updateContext({
              type: 'setPlacement',
              placement: state.placement
            })
          }
        }]
      }),
      [align, updateContext]
    )

    // EFFECTS
    useEffect(
      () => {
        doCallback(onShow, show);
      },
      [show, onShow]
    )
    useEffect(
      () => {
        if (!toggleRef.current || !popoverRef.current) return;
        createPopper(toggleRef.current, popoverRef.current, popperOptions) // initialize popper
      },
      [toggleRef, popoverRef, popperOptions]
    )
    useEffect(
      () => {
        if (show) {
          setHeight(position);
          window.addEventListener('click', clickLocator); // close on outisde click
          window.addEventListener('keyup', keyListener); // close on tab/return/escape
          window.addEventListener('scroll', () => setHeight(position)); // check how much space there is for dropdown
          window.addEventListener('scroll', checkVisible); // check if dropdown is still visible
          window.addEventListener('resize', hideDropdown); // close dropdown when window resizes
          return () => {
            window.removeEventListener('click', clickLocator);
            window.removeEventListener('keyup', keyListener);
            window.removeEventListener('scroll', () => setHeight(position));
            window.removeEventListener('scroll', checkVisible);
            window.removeEventListener('resize', hideDropdown);
          }
        }
      },
      [position, show, clickLocator, keyListener, setHeight, checkVisible, hideDropdown]
    )
    useEffect(
      () => {
        hideDropdown(); // close dropdown on navigation
      },
      [hideDropdown, location.pathname]
    )

    // RENDER
    return (
      <DropdownContext.Provider value={{
        ...context,
        setShow,
        outerRef,
        innerRef,
        toggleRef,
        popoverRef
      }}>
        <div ref={outerRef}>
          <Component {...props} ref={ref} />
        </div>
      </DropdownContext.Provider>
    )
  })
}
