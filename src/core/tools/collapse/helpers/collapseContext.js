import React, { createContext, forwardRef, useState } from 'react';

// DEPENDENCIES
import { compose } from 'redux';

// CONTEXT EXPORT
export const CollapseContext = createContext(null);

// MAIN COMPONENT
export const collapseContext = Component => {
  return compose(
    forwardRef
  )((props, ref) => {

    // STATE
    const [ open, setOpen ] = useState(false);

    // RENDER
    return (
      <CollapseContext.Provider value={{
        open,
        setOpen
      }}>
        <Component {...props} ref={ref} />
      </CollapseContext.Provider>
    )
  })
}
