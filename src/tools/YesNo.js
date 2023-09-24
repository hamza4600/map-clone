import React from 'react';

// MAIN COMPONENT
export default ({
  value,
  placeholder = 'N/A'
}) => {
  switch (value) {
    case true:
      return <span>Yes</span>
    case false:
      return <span className="text-muted">No</span>
    default:
      return <span className="text-muted">{placeholder}</span>
  }
}
