import React, { useMemo } from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';
import { compose } from 'redux';

// VARIABLES
import { RANGE_METHOD, RATE_METHOD } from 'globals.js';

// FUNCTIONS
import { inputName } from 'functions.js';

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
  columns = {
    xs: 24,
    md: 12
  },
  disabled,
  ...props
}) => {

  // FORM CONTEXT
  const {
    values: {
      time_to_reach_goal: {
        depreciation_rate,
        depreciation_rate_method
      } = {}
    }
  } = useFormikContext() || {};

  // MEMOS
  const options = useMemo(
    () => ({
      rateMethod: [
        {
          label: RANGE_METHOD.amount.label,
          value: RANGE_METHOD.amount.key
        },
        {
          label: RANGE_METHOD.percent.label,
          value: RANGE_METHOD.percent.key
        }
      ],
      rateAmount : [

      ]
    }),
    []
  )
  const useChechlist = useMemo(
//    () => depreciation_rate === RATE_METHOD.monthly.key && depreciation_rate_method === RANGE_METHOD.percent.key,
    () => false && depreciation_rate === RATE_METHOD.monthly.key && depreciation_rate_method === RANGE_METHOD.percent.key,
    [depreciation_rate, depreciation_rate_method]
  )
  const schema = useMemo(
    () => {
      switch(true) {
        case (depreciation_rate_method === RANGE_METHOD.amount.key) :
          return 'dollars';
        case (depreciation_rate_method === RANGE_METHOD.percent.key) :
          return 'percent';
        default:
          return;
      }
    },
    [depreciation_rate_method]
  )

  //RENDER
  return (
    <Form.Row>
      <Form.Checklist
        name={inputName('depreciation_rate_method', 'time_to_reach_goal')}
        options={options.rateMethod}
        type="radio"
        list={{
          cols: {
            xs: 12
          }
        }}
        formGroup={{
          cols: {
            xs: 24,
            md: 16
          }
        }}
        disabled={disabled || !depreciation_rate || depreciation_rate === RATE_METHOD.auto.key}
        {...props}
      />
      {useChechlist ? (
        <Form.Select
          name={inputName('depreciation_rate_amount', 'time_to_reach_goal')}
          options={options.rateAmount}
          formGroup={{
            cols: {
              xs: 24,
              md: 8
            }
          }}
          {...props}
        />
      ) : (
        <Form.Control
          name={inputName('depreciation_rate_amount', 'time_to_reach_goal')}
          schema={schema}
          formGroup={{
            cols: {
              xs: 24,
              md: 8
            }
          }}
          disabled={disabled || !depreciation_rate || !depreciation_rate_method || depreciation_rate === RATE_METHOD.auto.key}
          {...props}
        />
      )}
    </Form.Row>
  )
})
