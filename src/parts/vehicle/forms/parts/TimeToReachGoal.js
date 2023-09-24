import React, { useMemo } from 'react';

// VARIABLES
import { RATE_METHOD } from 'globals.js';

// FUNCTIONS
import { inputName } from 'functions.js';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import SetRate from './SetRate';

// MAIN COMPONENT
export default ({
  ...props
}) => {

  const options = useMemo(
    () => ({
      daysDate: [
        {
          label: 'By # of Days',
          value: 'DAY',
          control: {
            name: inputName('days', 'time_to_reach_goal'),
            schema: 'days'
          }
        },
        {
          label: 'By Date',
          value: 'DAT',
          control: {
            as: Form.Date,
            name: inputName('date', 'time_to_reach_goal'),
          }
        },
      ],
      depreciationRate: [
        {
          label: RATE_METHOD.monthly.label,
          value: RATE_METHOD.monthly.key
        },
        {
          label: RATE_METHOD.annually.label,
          value: RATE_METHOD.annually.key
        },
        {
          label: RATE_METHOD.auto.label,
          value: RATE_METHOD.auto.key
        }
      ]
    }),
    []
  )

  return (
    <Form.Body>
      <Form.Checklist
        name={inputName('method', 'time_to_reach_goal')}
        label={{
          className: 'input-label-unstyled',
          label: 'Time to Reach Goal'
        }}
        type="radio"
        options={options.daysDate}
        list={{
          direction: 'vertical'
        }}
        required
      />
      <Form.Checklist
        name={inputName('depreciation_rate', 'time_to_reach_goal')}
        label={{
          className: 'input-label-unstyled',
          label: 'Rate of Depreciation',
          position: 'above'
        }}
        type="radio"
        options={options.depreciationRate}
        list={{
          cols: {
            xs: 24,
            lg: 8
          }
        }}
        fullWidth
        required
      />
      <SetRate
        label={{
          className: 'input-label-unstyled',
          label: 'Set Rate',
          position: 'above'
        }}
      />
    </Form.Body>
  )
}
