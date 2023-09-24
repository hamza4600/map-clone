import React, { forwardRef, useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL VARIABLES
import { NUMBER_FORMATS } from 'numberFormats.js';

// GLOBAL COMPONENTS
import Number from 'core/tools/Number';

// CHILD COMPONENTS
export default forwardRef(({
  className,
  value,
  variant,
}, ref) => {

  // MEMOS
  variant = useMemo(
    () => variant || (parseFloat(value) < 0 ? 'danger' : parseFloat(value) > 0 ? 'success' : 'primary'),
    [value, variant]
  )
  const prefix = useMemo(
    () => parseFloat(value) < 0 ? <>-&nbsp;$</> : parseFloat(value) > 0 ? <>+&nbsp;$</> : '$',
    [value]
  )

  // RENDER
  return (
    <Number
      className="text-primary"
      value={value}
      numberFormat={{
        ...NUMBER_FORMATS.amount,
        prefix: undefined,
        thousandSeparator: true,
        decimalScale: 0,
        allowNegative: false,
        renderText: formattedValue => (
          <span
            className={clsx(
              `text-${variant}`,
              className
            )}
          >
            {prefix}{formattedValue}
          </span>
        )
      }}
    />
  )
})
