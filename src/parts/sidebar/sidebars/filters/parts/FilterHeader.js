import React, { useCallback, useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { useFormikContext } from 'formik';
import { startCase } from 'lodash';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Badge from 'tools/Badge';

// STYLES
import styles from '../filters.module.scss';

// MAIN COMPONENT
export default ({
  children,
  className,
  open,
  onClick,
  disabled,
  groupKey,
  columns = [],
  checkedColumns = []
}) => {

  // FORMIK CONTEXT
  const { values, setValues, submitForm } = useFormikContext();

  // MEMOS
  const value = useMemo(
    () => values[groupKey] || [],
    [groupKey, values]
  )

  // CALLBACKS
  const handleClick = useCallback(
    e => {
      setValues({
        ...values,
        [groupKey]: e.target.checked ? columns : []
      });
      submitForm();
    },
    [groupKey, columns, values, setValues, submitForm]
  )

  // RENDER
  return (
    <h4 className={className}>
      <div className={styles.checkbox}>
        <Form.Checklist.Checkbox
          onChange={handleClick}
          checked={columns.length === value.length}
          disabled={disabled}
        />
      </div>
      <div
        className={clsx(
          styles.title,
          checkedColumns.length < 1 ? styles.empty : '',
          disabled ? styles.disabled : ''
        )}
         onClick={onClick}
      >
        {startCase(groupKey)}
      </div>
      <Badge
        variant={open ? 'accent-light' : disabled ? 'light' : 'secondary'}
        className={styles.badge}
        pill
      >
        {checkedColumns.length}/{columns.length}
      </Badge>
      {children}
    </h4>
  )
}
