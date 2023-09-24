import React, { Children, cloneElement, forwardRef } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { compose } from 'redux';

// HELPERS
import { formikField } from '../../helpers/formik/formikField';
import { formCollapse } from '../../helpers/layout/formCollapse';
import { formGroup } from '../../helpers/layout/formGroup';
import { inputLabel } from '../../helpers/layout/inputLabel';
import { inputText } from '../../helpers/layout/inputText';
import { inputFeedback } from '../../helpers/layout/inputFeedback';
import { useHidden } from '../../helpers/layout/useHidden';
import { blankOption } from '../../helpers/options/blankOption';
import { defaultOption } from '../../helpers/options/defaultOption';
import { handleSelect } from '../../helpers/options/handleSelect';
import { lookupOptions } from '../../helpers/options/lookupOptions';
import { optionsArray } from '../../helpers/options/optionsArray';
import { optionsFilter } from '../../helpers/options/optionsFilter';
import { selectedOption } from '../../helpers/options/selectedOption';
import { inputState } from '../../helpers/state/inputState';
import { inputValidation } from '../../helpers/state/inputValidation';

// CORE COMPONENTS
import Dropdown from 'core/tools/dropdown/Dropdown';

// LOCAL COMPONENTS
import Input from './parts/Input';
import Item from './parts/Item';

// STYLES
import styles from './select.module.scss';

// MAIN COMPONENT
const Select = compose(
  inputValidation,
  formikField,
  inputState,
  useHidden,
  formCollapse,
  formGroup,
  inputLabel,
  inputFeedback,
  inputText,
  lookupOptions,
  optionsArray,
  blankOption,
  optionsFilter,
  handleSelect,
  selectedOption,
  defaultOption,
  forwardRef
)(({
  children,
  className,
  plaintext,
  options,
  onToggle,
  useDropdown = !plaintext && (options.length > 0 || !!children),
  toggle = {},
  dropdown = {},
  ...props
}, ref) => (
  <div
    className={clsx(
      'select-group',
      styles.container,
      props.show && styles.show,
      props.show && 'show',
      props.inline && styles.inline,
      props.vertical && styles.vertical,
      props.columns && styles.columns,
      props.fullWidth && styles.fullWidth,
      className
    )}
  >
    {useDropdown ? (
      <Dropdown
        toggle={{
          as: Input,
          useDropdown,
          ...toggle,
          ...props
        }}
        size={props.size}
        onToggle={onToggle}
        align="end"
        fullWidth
        {...dropdown}
      >
        {Array.isArray(options) &&
          <div className={styles.items}>
            {options.map((option, i) => (
              <Item
                key={i}
                option={option}
                {...props}
              />
            ))}
          </div>
        }
        {Children.map(children, (child, i) => cloneElement(child, {
          ...props
        }))}
      </Dropdown>
    ) : (
      <Input
        plaintext={plaintext}
        useDropdown={useDropdown}
        ref={ref}
        {...props}
      />
    )}
  </div>
))

// EXPORT
export default Select;
