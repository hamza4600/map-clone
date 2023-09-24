import React, { useCallback, useEffect, useState } from 'react';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// BOOTSTRAP COMPONENT
import { Modal } from 'react-bootstrap';

// STYLES
import styles from './modalLightbox.module.scss';

// MAIN COMPONENT
export const modalLightbox = Component => ({
  ID,
  close,
  onClose,
  onExited,
  ...props
}) => {

  // STATE
  const [ show, setShow ] = useState(true);

  // CALLBACKS
  const handleClose = useCallback(
    (callBack) => {
      doCallback(callBack);
      doCallback(onClose);
      setShow(false);
    },
    [onClose, setShow]
  )

  // EFFECTS
  useEffect(
    () => {
      if (close) handleClose();
      else setShow(true);
    },
    [ID, close, setShow, handleClose]
  )

  // RENDER
  return (
    <Modal
      size="lg"
      dialogAs={({ children }) => <div className={styles.container}>{children}</div>}
      onHide={handleClose}
      onExited={onExited}
      show={show}
      backdrop={'static'}
    >
      <Component
        {...props}
        onClose={handleClose}
      />
    </Modal>
  )
}
