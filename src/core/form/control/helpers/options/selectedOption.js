import React, { forwardRef, useMemo } from 'react';

// MAIN COMPONENT
export const selectedOption = Component => {
  return forwardRef((props, ref) => {

    // PROPS
    const {
      value = '',
      options,
    } = props;

    // MEMOS
    const selection = useMemo(
      () => {
        if (!Array.isArray(options)) return;
        return options[options.findIndex(
          o => o.value !== undefined && o.value.toString() === value.toString()
        )];
      },
      [value, options]
    )

    // RENDER
    return <Component
      {...props}
      selection={selection}
      ref={ref}
    />
  })
}
