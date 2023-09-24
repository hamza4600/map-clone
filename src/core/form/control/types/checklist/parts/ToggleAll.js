import React, { useCallback, useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { isEmpty, isFunction } from 'lodash';

// BOOTSTRAP COMPONENTS
import { Col } from 'react-bootstrap';

// CORE COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './toggleAll.module.scss';

// MAIN COMPONENT
const ToggleAll = ({
  className,
  name,
  options,
  valueArray,
  useCSV,
  disabled,
  form: {
    setFieldValue
  } = {}
}) => {

  // MEMOS
  const allValues = useMemo(
    () => options.map(({ value }) => value.toString()),
    [options]
  )
  const isAll = useMemo(
    () => {
      return !allValues.filter(value => !valueArray.includes(value)).length;
    },
    [valueArray, allValues]
  )
  const isNone = useMemo(
    () => isEmpty(valueArray),
    [valueArray]
  )

  // CALLBACKS
  const setAll = useCallback(
    () => {
      const newValue = [ ...allValues ];
      setFieldValue(name, useCSV ? newValue.join[','] : newValue );
    },
    [name, allValues, useCSV, setFieldValue]
  )
  const setNone = useCallback(
    () => {
      setFieldValue(name, '')
    },
    [name, setFieldValue]
  )

  // RENDER
  return !isFunction(setFieldValue) ? null : (
    <Col
      className={clsx(
        styles.col,
        className
      )}
    >
      <div className={clsx(
        styles.container,
        disabled && styles.disabled
      )}>
        <Button.Link
          className={clsx(
            styles.btn,
            disabled && styles.disabled
          )}
          label="Check All"
          onClick={setAll}
          disabled={isAll || disabled}
        />
        &nbsp;/&nbsp;
        <Button.Link
          className={clsx(
            styles.btn,
            disabled && styles.disabled
          )}
          label="Uncheck All"
          onClick={setNone}
          disabled={isNone || disabled}
        />
      </div>
    </Col>
  )
}


// EXPORT
export default ToggleAll;
