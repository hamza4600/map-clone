import React, { forwardRef, useMemo } from 'react';

// MAIN COMPONENT
export const blankOption = Component => {
  return forwardRef(({
    options,
    useBlank,
    ...props
  }, ref) => {

    // MEMOS
    options = useMemo(
      () => Array.isArray(options) && useBlank ? [
        {
          label: 'None',
          value: ''
        },
        ...options
      ] : options,
      [options, useBlank]
    )

    // RENDER
    return <Component
      {...props}
      options={options}
      ref={ref}
    />
  })
}
