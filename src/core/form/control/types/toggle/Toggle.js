import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { TOGGLE } from 'defaults.js';

// HELPERS
import { formikField } from '../../helpers/formik/formikField';
import { formCollapse } from '../../helpers/layout/formCollapse';
import { formGroup } from '../../helpers/layout/formGroup';
import { inputFeedback } from '../../helpers/layout/inputFeedback';
import { inputGroup } from '../../helpers/layout/inputGroup';
import { inputLabel } from '../../helpers/layout/inputLabel';
import { inputText } from '../../helpers/layout/inputText';
import { useHidden } from '../../helpers/layout/useHidden';
import { lookupOptions } from '../../helpers/options/lookupOptions';
import { optionsArray } from '../../helpers/options/optionsArray';
import { inputState } from '../../helpers/state/inputState';
import { inputValidation } from '../../helpers/state/inputValidation';

// BOOTSTRAP COMPONENTS
import { ButtonGroup } from 'react-bootstrap';

// LOCAL COMPONENTS
import ToggleButton from './parts/ToggleButton';
import Col from '../../../parts/Col';
import Row from '../../../parts/Row';

// STYLES
import styles from './toggle.module.scss';

// MAIN COMPONENT
const Toggle = compose(
  lookupOptions,
  optionsArray,
  inputValidation,
  formikField,
  inputState,
  useHidden,
  formCollapse,
  formGroup,
  inputLabel,
  inputFeedback,
  inputText,
  inputGroup
)(({
  className,
  value,
  options = [],
  group = TOGGLE.useGroup,
  inline,
  vertical,
  columns,
  column,
  fullWidth,
  groupWrapper: Outer = group ? ButtonGroup : Row,
  buttonWrapper: Inner = group ? ({ children }) => <>{children}</> : Col,
  // REST
  ...props
}) => (
  <Outer
    className={clsx(
      styles.outer,
      group && styles.group,
      inline && styles.inline,
      vertical && styles.vertical,
      columns && styles.columns,
      column && styles.column,
      fullWidth && styles.fullWidth,
      className
    )}
    vertical={column}
  >
    {options.map((option, i) => (
      <Inner
        key={i}
        className={styles.inner}
        cols={{
          xs: column ? 24 : inline ? 'auto' : undefined
        }}
      >
        <ToggleButton
          {...props}
          {...option}
          className={clsx(
            styles.btn,
            option.className
          )}
        />
      </Inner>
    ))}
  </Outer>
))

// EXPORT
export default Toggle;
