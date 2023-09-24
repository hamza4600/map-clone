import React, { forwardRef, useCallback, useMemo, useState } from 'react';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// MAIN COMPONENT
export const optionsFilter = Component => {
  return forwardRef(({
    options,
    onChange,
    dropdown: {
      onShow,
      ...dropdown
    } = {},
    filterOptions,
    allowCustom = filterOptions,
    showCustom = filterOptions,
    ...props
  }, ref) => {

    // FILTER STATE
    const [filter, setFilter] = useState();

    // OPTIONS MEMO
    options = useMemo(
      () => Array.isArray(options) && filter ? options.filter(o => o.label.toLowerCase().search(filter.toLowerCase()) > -1) : options,
      [options, filter]
    )

    // FILTER CALLBACK
    const handleShow = useCallback(
      show => {
        doCallback(onShow, show);
        if (filterOptions && !show) setFilter(undefined);
      },
      [onShow, filterOptions, setFilter]
    )
    const handleChange = useCallback(
      e => {
        doCallback(onChange, e);
        if (filterOptions) setFilter(e.target.value);
      },
      [onChange, filterOptions, setFilter]
    )

    // RENDER
    return <Component
      {...props}
      options={options}
      onChange={handleChange}
      dropdown={{
        ...dropdown,
        onShow: handleShow
      }}
      allowCustom={allowCustom}
      showCustom={showCustom}
      ref={ref}
    />
  })
}
