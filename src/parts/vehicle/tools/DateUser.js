import React from 'react';

// FUNCTIONS
import { formatDateTime } from 'functions.js';

// MAIN COMPONENT
export default ({
  date,
  user,
  placeholder = 'N/A'
}) => !date ? (
  <span className="text-muted">{placeholder}</span>
) : !user ? (
  <span>{formatDateTime(date)}</span>
) : (
  <span>
    {formatDateTime(date)}
    &nbsp;
    <span className="text-primary">{user}</span>
  </span>
)
