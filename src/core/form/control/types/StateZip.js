import React, { forwardRef } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { PLACEHOLDERS } from 'defaults.js';

// HELPERS
import { formCollapse } from '../helpers/layout/formCollapse';
import { formGroup } from '../helpers/layout/formGroup';
import { inputLabel } from '../helpers/layout/inputLabel';
import { inputText } from '../helpers/layout/inputText';

// LOCAL COMPONENTS
import Select from './select/Select';
import Control from '../Control';
import Col from '../../parts/Col';
import Row from '../../parts/Row';

// STYLES
import styles from './stateZip.module.scss';

// MAIN COMPONENT
const StateZip = compose(
  formCollapse,
  formGroup,
  inputLabel,
  inputText,
  forwardRef
)(({
  state,
  zip,
  required,
  inline,
  vertical,
  columns,
  fullWidth,
  ...props
}, ref) => (
  <Row className={clsx(
    styles.row,
    inline && styles.inline,
    vertical && styles.vertical,
    columns && styles.columns,
    fullWidth && styles.fullWidth,
  )}>
    <Col xs={14}>
      <Row>
        <Select
          {...state}
          className={clsx(
            styles.state,
            state.className
          )}
          placeholder={PLACEHOLDERS.state}
          lookup="usaState"
          optionKeys={{
            label: 'state_name',
            value: 'us_state_id'
          }}
          required={required || state.required}
        />
      </Row>
    </Col>
    <Col xs={10}>
      <Row>
        <Control
          {...zip}
          className={clsx(
            styles.zip,
            state.className
          )}
          schema="postalCode"
          required={required || zip.required}
        />
      </Row>
    </Col>
  </Row>
))

// EXPORT
export default StateZip;
