import React, { useMemo } from 'react';

// DEPENDENCIES
import { compose } from 'redux';

// VARIABLES
import { ADD_DEDUCTS, RANGE_METHOD } from 'globals.js';

// GLOBAL HELPERS
import { formGroup } from 'core/form/control/helpers/layout/formGroup';
import { inputLabel } from 'core/form/control/helpers/layout/inputLabel';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// MAIN COMPONENT
export default compose(
  formGroup,
  inputLabel
)(({
  name = {},
  method,
  disabled
}) => {

  // MEMOS
  const options = useMemo(
    () => ([
      {
        label: 'Below',
        value: ADD_DEDUCTS.below
      },
      {
        label: 'Above',
        value: ADD_DEDUCTS.above
      }
    ]),
    []
  )
  const schema = useMemo(
    () => {
      switch(method) {
        case RANGE_METHOD.amount.key:
          return 'dollars';
        case RANGE_METHOD.percent.key:
          return 'percent';
        default:
          return undefined
      }
    },
    [method]
  )

  //RENDER
  return (
    <Form.Row>
      <Form.Checklist
        name={name.method}
        options={options}
        type="radio"
        cols={{
          xs: 12
        }}
        formGroup={{
          cols: {
            xs: 24,
            md: 16
          }
        }}
        fullWidth
        disabled={disabled}
      />
      <Form.Control
        name={name.amount}
        schema={schema}
        formGroup={{
          cols: {
            xs: 24,
            md: 8
          }
        }}
        disabled={disabled}
      />
    </Form.Row>
  )
})
