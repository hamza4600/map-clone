import React, { useCallback, useEffect, useMemo, useRef, useReducer } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { isEqual } from 'lodash';
import { ResizeObserver } from 'resize-observer';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// STYLES
import styles from './scrollbox.module.scss';

// LOCAL VARIABLES
const INIT = [0, 0];

// LOCAL FUNCTIONS
const checkCoord = (coord, range) => Math.min(0, Math.max(coord, range));

// INIT/REDUCER
const init = coords => ({
  range: coords,
  scroll: coords
})
const reducer = (state, { type, ...action }) => {

  let scroll = INIT;

  switch (type) {
    case 'setRange':
      const { range = INIT } = action;

      // if no change in range, do nothing
      if (isEqual(range, state.range)) return state;

      // check to see if scroll exceeds new range
      scroll = state.scroll.map((coord, i) => checkCoord(coord, range[i]));

      return {
        range,
        scroll
      }
    case 'initScroll':
      return {
        ...state,
        scroll
      }
    case 'updateScroll':
      const { delta = INIT } = action;

      // check to see if scroll exceeds range
      scroll = state.scroll.map((coord, i) => checkCoord(coord - delta[i], state.range[i]));

      // if no change in scroll, do nothing
      if (isEqual(scroll, state.scroll)) return state;

      const newState = {
        ...state,
        scroll
      };
      doCallback(action.onUpdate);
      return newState;
    default:
      throw new Error();
  }
}

// MAIN COMPONENT
const Scrollbox = ({
  children,
  outerClassName,
  innerClassName,
  trayClassName,
  outerStyle = {},
  innerStyle = {},
  onScroll,
  direction = 'vertical',
  preventDefault = false,
  disabled,
  reset
}) => {

  // REFS
  const scrollboxOuter = useRef();
  const scrollboxInner = useRef();
  const scrollboxTray  = useRef();
  const touchRef       = useRef();

  // STATE
  const [ scrollState, updateState ] = useReducer(reducer, INIT, init);
  const { range } = scrollState;

  // CALLBACKS
  const updateRange = useCallback( // measure difference between outer and inner container sizes
    () => {
      const range = !scrollboxOuter.current || !scrollboxInner.current ? [0, 0] : [
        Math.min(scrollboxOuter.current.offsetWidth - scrollboxInner.current.offsetWidth, 0),
        Math.min(scrollboxOuter.current.offsetHeight - scrollboxInner.current.offsetHeight, 0)
      ]
      updateState({
        type: 'setRange',
        range
      });
    },
    [scrollboxOuter, scrollboxInner, updateState]
  )
  const updateScroll = useCallback( // update scroll based on user interaction, conditionally preventing default
    (delta, e) => {
      e.stopPropagation();
      if (preventDefault) e.preventDefault();
      updateState({
        type: 'updateScroll',
        onUpdate: () => {
          e.preventDefault();
        },
        delta
      });
    },
    [preventDefault, updateState]
  )

  // SCROLL LISTENER
  useEffect(
    () => {
      doCallback(onScroll, scrollState);
    },
    [onScroll, scrollState]
  )

  // PROP-BASED SCROLL RE-INITIALIZATION
  useEffect(
    () => {
      if (reset) updateState({
        type: 'initScroll'
      });
    },
    [reset, updateState]
  )

  // HORIZONTAL HEIGHT
  const height = useMemo(
    () => {
      if (direction !== 'horizontal' || !range) return;
      const outerBox = scrollboxOuter.current;
      const tray = scrollboxTray.current;
      if (!outerBox || !tray) return;
      return tray.offsetHeight;
    },
    [direction, range, scrollboxTray]
  )

  // SCROLLBOX RESIZE OBSERVER
  useEffect(
    () => {
      const resizeObserver = new ResizeObserver(updateRange);
      const outerBox = scrollboxOuter.current;
      const innerBox = scrollboxInner.current;
      resizeObserver.observe(outerBox);
      resizeObserver.observe(innerBox);
      return () => {
        resizeObserver.disconnect(outerBox)
        resizeObserver.disconnect(innerBox);
      };
    },
    [scrollboxOuter, scrollboxInner, updateRange]
  )

  // MOUSEWHEEL/TOUCHSCREEN
  const handleWheel = useCallback(
    e => {
      const { deltaX, deltaY } = e;
      if (!deltaX && !deltaY) return;
      updateScroll([deltaX, deltaY], e)
    },
    [updateScroll]
  )
  const handleTouch = useCallback(
    e => {
      if (e.touches.length > 1) return;
      const { pageX, pageY } = e.touches[0];
      switch (e.type) {
        case 'touchstart':
          if (!e.touches || !e.touches[0]) return;
          touchRef.current = [pageX, pageY];
          break;
        case 'touchmove':
          if (!e.touches || !e.touches[0] || !touchRef.current) return;
          const deltaX = (touchRef.current[0] - pageX)/10;
          const deltaY = (touchRef.current[1] - pageY)/10;
          updateScroll([deltaX, deltaY], e)
          break;
        case 'touchend':
          touchRef.current = undefined;
          break;
        default:
          return;
      }
    },
    [touchRef, updateScroll]
  )
  useEffect(
    () => {
      if (!scrollboxInner.current) return;
      const scrollboxTarget = scrollboxInner.current;
      scrollboxTarget.addEventListener('wheel', handleWheel, {passive: false});
      scrollboxTarget.addEventListener('touchstart', handleTouch, {passive: false});
      scrollboxTarget.addEventListener('touchmove', handleTouch, {passive: false});
      scrollboxTarget.addEventListener('touchend', handleTouch, {passive: false});
      return () => {
        scrollboxTarget.removeEventListener('wheel', handleWheel, {passive: false});
        scrollboxTarget.removeEventListener('touchstart', handleTouch, {passive: false});
        scrollboxTarget.removeEventListener('touchmove', handleTouch, {passive: false});
        scrollboxTarget.removeEventListener('touchend', handleTouch, {passive: false});
      }
    },
    [handleWheel, handleTouch]
  )

  // STYLE
  const [ left, top ] = scrollState.scroll;

  // RENDER
  return (
    <div
      className={clsx(
        'scrollbox-outer',
        styles.outer,
        styles[direction],
        !!disabled && styles.disabled,
        outerClassName
      )}
      style={{
        height,
        ...outerStyle
      }}
      ref={scrollboxOuter}
    >
      <div
        className={clsx(
          'scrollbox-inner',
          styles.inner,
          styles[direction],
          !!disabled && styles.disabled,
          innerClassName
        )}
        ref={scrollboxInner}
        style={{
          left,
          top
        }}
      >
        <div
          className={clsx(
            'scrollbox-tray',
            styles.tray,
            styles[direction],
            !!disabled && styles.disabled,
            trayClassName
          )}
          ref={scrollboxTray}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

// EXPORT
export default Scrollbox;
