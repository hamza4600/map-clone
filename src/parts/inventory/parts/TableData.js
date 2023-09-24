import React from 'react';

// GLOBAL COMPONENTS
import Number from 'core/tools/Number';

// MAIN COMPONENT
export default ({
  className,
  children,
  format,
  schema
}) => schema ? (
  <Number
    className={className}
    value={children}
    placeholder="N/A"
    schema={schema}
  />
) : children === undefined ? (
  <span className="text-muted">N/A</span>
) : (
  <span className={className}>{children}</span>
)
