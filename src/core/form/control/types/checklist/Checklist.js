import React, { useCallback, useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { compose } from 'redux';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

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
import { inputArray } from '../../helpers/state/inputArray';
import { inputState } from '../../helpers/state/inputState';
import { inputValidation } from '../../helpers/state/inputValidation';

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

// LOCAL COMPONENTS
import Checkbox from './parts/Checkbox';
import ToggleAll from './parts/ToggleAll';

// STYLES
import styles from './checklist.module.scss';

// MAIN COMPONENT
const Checklist = compose(
  inputValidation,
  formikField,
  useHidden,
  formCollapse,
  formGroup,
  inputLabel,
  inputFeedback,
  inputText,
  lookupOptions,
  optionsArray,
  inputArray,
  inputState,
  inputGroup
)(({
  className,
  type = 'checkbox',
  label = {},
  onBlur,
  onChange,
  list: {
    cols = {},
    direction,
    justify = 'between'
  } = {},
  size,
  vertical,
  columns,
  fullWidth,
  wrapper: Wrapper = ({ children }) => <>{children}</>,
  checkFirst,
  toggleAll,
  required,
  disabled,
  debug,
  hasError,
  ...props
}) => {

  // PROPS
  const {
    name,
    value = '',
    options,
    form: {
      setFieldTouched
    } = {},
  } = props;

  // VALUE ARRAY
  const valueArray = useMemo(
    () => Array.isArray(value) ? value.map(value => value.toString()) : value.toString().split(',').map(value => value.toString()).filter(v => v),
    [value]
  )

  // CHECK STATE
  const isChecked = useCallback(
    ({ value }) => valueArray.includes(value) || valueArray.includes(String(value)),
    [valueArray]
  )
  const handleChange = useCallback(
    e => {
      doCallback(setFieldTouched, name, true);
      doCallback(onChange, e);
    },
    [name, onChange, setFieldTouched]
  )

  // RENDER
  return (
    <div className={clsx(
      'checklist',
      styles.checklist,
      styles[size],
      className
    )}>
      <Row className={clsx(
        'checklist-row',
        className,
        styles.row,
        styles[direction],
        styles[justify],
        vertical && styles.vertical,
        columns && styles.columns,
        fullWidth && styles.fullWidth
      )}>
        {toggleAll &&
          <ToggleAll
            className={clsx(
              styles.col,
              styles[size]
            )}
            valueArray={valueArray}
            disabled={disabled}
            {...props}
          />
        }
        {options.map((option, i) => (
          <Col
            {...cols}
            {...option.cols}
            key={i}
            className={clsx(
              'checklist-col',
              styles.col,
              styles[size],
              styles[direction],
              option.control && styles.control,
              option.hide && styles.hide
            )}
          >
            <Checkbox
              type={type}
              checked={isChecked(option)}
              onBlur={onBlur}
              onChange={handleChange}
              hasError={hasError}
              size={size}
              direction={direction}
              required={required}
              disabled={disabled}
              debug={debug}
              {...option}
            />
          </Col>
        ))}
      </Row>
    </div>
  )
})

// CHILD COMPONENTS
Checklist.Checkbox = Checkbox;
Checklist.Large = props => (
  <Checklist
    list={{
      cols: {
        xs: 24,
        sm: 12,
        lg: 8
      }
    }}
    fullWidth
    toggleAll
    {...props}
  />
)

// EXPORT
export default Checklist;
