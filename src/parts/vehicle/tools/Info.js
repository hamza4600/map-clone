import React, { useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { compose } from 'redux';

// FUNCTIONS
import { formatFunctions } from 'functions.js';

// HELPERS
import { getLookupData } from 'helpers/getLookupData';
import { lookupOptions } from 'core/form/control/helpers/options/lookupOptions';

// GLOBAL COMPONENTS
import Number from 'core/tools/Number';
import YesNo from 'tools/YesNo';

// STYLES
import styles from './info.module.scss';

// LOCAL VARIABLES
const BLANK = 'N/A';

// MAIN COMPONENT
export default compose(
  getLookupData(),
  lookupOptions
)(({
  as: Component,
  value = '',
  label,
  options,
  format,
  schema,
  ...props
}) => {

  // MEMOS
  value = useMemo(
    () => {
      if (!Array.isArray(options) || options.length < 1) return value;
      const option = options.find(o => {
        return (o.value !== undefined && o.value !== null && o.value.toString() === value.toString()) || (o.key !== undefined && o.key !== null && o.key.toString() === value.toString())
      }) || {};
      return option.label;
    },
    [value, options]
  )
  const formatFunction = useMemo(
    () => formatFunctions[format] || (value => value),
    [format]
  )

  // RENDER
  return (
    <div className={clsx(
      styles.container,
      styles.border,
      styles[schema]
    )}>
      <label className={styles.label}>{label}</label>
      <span className={styles.value}>
        {!!Component ? (
          <Component
            {...props}
            value={value}
            placeholder={BLANK}
          />
        ) : typeof value === 'boolean' ? (
          <YesNo
            value={value}
            placeholder={BLANK}
          />
        ) : !!schema ? (
          <Number
            value={value}
            placeholder={BLANK}
            schema={schema}
          />
        ) : formatFunction(value) || <span className="text-muted">{BLANK}</span>}
      </span>
    </div>
  )
})
