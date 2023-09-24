import React, { useCallback, useContext } from 'react';

// DEPENDENCIES
import { cloneDeep } from 'lodash';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { NUMBER_FORMATS } from 'numberFormats.js';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// CONTEXT
import { DropdownContext } from 'core/tools/dropdown/helpers/dropdownContext';

// CORE COMPONENTS
import Calendar from 'core/tools/calendar/Calendar';

// LOCAL COMPONENTS
import Select from '../../select/Select';

// STYLES
import styles from './datePicker.module.scss';

// MAIN COMPONENT
const DatePicker = compose(
//  dateValidation
)(({
  useDateRange,
  allowCustom = false,
  dropdown = {},
  toggle = {},
  ...props
}) => (
  <Select
    className={styles.select}
    value={props.currentDate}
    allowCustom={allowCustom}
    dropdown={{
      fullWidth: false,
      ...dropdown
    }}
    toggle={{
      icon: 'calendar',
      placeholder: NUMBER_FORMATS.date.placeholder,
      numberFormat: allowCustom ? NUMBER_FORMATS.date : undefined,
      input: {
        htmlSize: props.inline ? 10 : undefined
      },
      ...toggle
    }}
    {...props}
  >
    <Dropdown {...props} />
  </Select>
))

// CHILD COMPONENTS
const Dropdown = ({
  value,
  onSelect,
  multiple,
  ...props
}) => {

  // CONTEXT
  const { show, setShow } = useContext(DropdownContext) || {};

  // CALLBACKS
  const handleSelect = useCallback(
    dateValue => {
      const newValue = multiple ? [dateValue].reduce((arr, val) => {
        if (arr.includes(val)) arr.splice(arr.indexOf(val), 1);
        else arr.push(val);
        return arr;
      }, cloneDeep(value) || []).sort((a, b) => new Date(a).getTime() - new Date(b).getTime()) : dateValue;
      doCallback(onSelect, newValue);
      if (!multiple) setShow(false);
    },
    [value, onSelect, multiple, setShow]
  )

  // RENDER
  return (
    <Calendar
      {...props}
      show={show}
      onSelect={handleSelect}
      className={styles.picker}
    />
  )
}

// EXPORT
export default DatePicker;
