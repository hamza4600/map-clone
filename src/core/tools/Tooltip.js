import React, { useCallback, useRef, useState } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL VARIABLES
import { TIMES } from 'globals.js';

// BOOTSTRAP COMPONENTS
import { Overlay, Tooltip as BootstrapTooltip } from 'react-bootstrap';

// STYLES
import styles from './tooltip.module.scss';

// MAIN COMPONENT
const Tooltip = ({
  children,
  className,
  wrapperClassName,
  variant = 'primary',
  placement = 'bottom',
  tip
}) => {

  // TARGET REF
  const target = useRef(null);
  const delay = useRef(null);

  // SHOW STATE
  const [ show, setShow ] = useState(false);

  // SHOW TOGGLES
  const handleMouseEnter = useCallback(
    () => {
      delay.current = setTimeout(() => {
        delay.current = null;
        setShow(true)
      }, TIMES.tooltipDelay);
    },
    [setShow, delay]
  )
  const handleMouseLeave = useCallback(
    () => {
      if (delay.current) {
        clearTimeout(delay.current);
        delay.current = null;
      }
      setShow(false)
    },
    [setShow]
  )

  // RENDER
  return !tip ? children : (<>
    <div
      className={clsx(
        'tooltip-wrapper',
        styles.wrapper,
        wrapperClassName
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={target}
    >
      {children}
    </div>
    <Overlay
      target={target.current}
      show={show}
      placement={placement}
    >
      <BootstrapTooltip
        className={clsx(
          styles.tooltip,
          styles[variant],
          className
        )}
      >
        {tip}
      </BootstrapTooltip>
    </Overlay>
  </>)
}

// EXPORT
export default Tooltip;
