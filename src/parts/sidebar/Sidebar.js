import React, { useCallback, useEffect, useRef } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// FUNCTIONS
import { toggleSidebar } from 'actions.js';
import { doCallback } from 'functions.js';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// LOCAL COMPONENTS
import Scrollbox from 'core/tools/Scrollbox';

// STYLES
import breakpoints from 'css/custom/export/_breakpoints.scss';
import styles from './sidebar.module.scss';

// MAIN COMPONENT
export default compose(
  connect(
    ({ sidebar }) => ({ show: sidebar }),
    { toggle: toggleSidebar }
  ),
  withRouter
)(({
  children,
  className,
  id,
  title,
  onOpen,
  onClose,
  max = 'xl',
  min = 'xs',
  navClose = false,
  clickClose = false,
  // REDUX STATE
  show,
  // REDUX DISPATCH
  toggle,
  // REACT ROUTER
  location: {
    pathname
  }
}) => {

  const sidebar = useRef();

  // CLOSE SIDEBAR
  const handleClose = useCallback(
    () => {
      toggle(false);
      doCallback(onClose);
    },
    [onClose, toggle]
  );

  // UNMOUNT LISTENER
  useEffect(
    () => handleClose,
    [handleClose]
  )

  // NAVIGATION CLOSE
  useEffect(
    () => {
      if (navClose) handleClose()
    },
    [navClose, pathname, handleClose]
  )

  // WINDOW CLICK CLOSE
  const handleClick = useCallback(
    e => clickClose && sidebar.current && !sidebar.current.contains(e.target) ? handleClose() : null,
    [clickClose, sidebar, handleClose]
  );

  // WINDOW RESIZE CLOSE
  const handleResize = useCallback(
    () => window.innerWidth > breakpoints[max] || window.innerWidth < breakpoints[min] ? handleClose() : null,
    [max, min, handleClose]
  )

  // WINDOW CLICK/RESIZE LISTENERS
  useEffect(
    () => {
      if (show) {
        window.addEventListener('click', handleClick);
        window.addEventListener('resize', handleResize);
      } else {
        window.removeEventListener('click', handleClick);
        window.removeEventListener('resize', handleResize);
      }

      return () => {
        window.removeEventListener('click', handleClick);
        window.removeEventListener('resize', handleResize);
      }
    },
    [show, handleClick, handleResize]
  )

  // RENDER
  return (
    <>
      <div
        id={id}
        className={clsx(
          styles.sidebar,
          className
        )}
        ref={sidebar}
        data-show={show}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <Button.Link
            className={styles.button}
            icon="x"
            onClick={handleClose}
          />
        </div>
        <div className={styles.body}>
          <Scrollbox
            reset={!show}
            preventDefault
          >
            <div className={styles.container}>
              {children}
            </div>
          </Scrollbox>
        </div>
      </div>
    </>
  )
})
