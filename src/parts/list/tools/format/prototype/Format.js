import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { toString } from 'lodash';

// STYLES
import styles from './format.module.scss';

// MAIN COMPONENT
const Format = ({
  children = '',
  className
}) => (
  <span className={clsx(
    styles.span,
    !children && styles.empty,
    className
  )}>{toString(children) || <>&ndash;</>}</span>
)

// EXPORT
export default Format;
