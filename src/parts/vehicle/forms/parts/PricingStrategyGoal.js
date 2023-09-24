import React, { useMemo } from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';

// VARIABLES
import { RANGE_METHOD, GOAL_METHODS, PRICE_POINTS } from 'globals.js';

// FUNCTIONS
import { inputName } from 'functions.js';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import AboveBelow from './AboveBelow';

// MAIN COMPONENT
export default ({
  title,
  name,
  label,
  disabled,
  ...props
}) => {

  // FORM CONTEXT
  const {
    values: {
      [name]: {
        method,
        imv_pricing_method: {
          imv_range_method
        } = {}
      } = {}
    }
  } = useFormikContext() || {};

  // MEMOS
  const options = useMemo(
    () => ({
      method: [
        {
          label: GOAL_METHODS.price.label,
          value: GOAL_METHODS.price.key,
          control: {
            name: inputName('price', name),
            schema: 'dollars'
          }
        },
        {
          label: GOAL_METHODS.imvLabel.label,
          value: GOAL_METHODS.imvLabel.key,
          control: {
            as: Form.Select,
            name: inputName('imv_label', name, 'imv_pricing_method'),
            options: Object.keys(PRICE_POINTS).map(key => ({
              label: PRICE_POINTS[key].label,
              value: PRICE_POINTS[key].key
            }))
          }
        },
        {
          label: GOAL_METHODS.auto.label,
          value: GOAL_METHODS.auto.key
        }
      ],
      rangeMethod: [
        {
          label: RANGE_METHOD.amount.label,
          value: RANGE_METHOD.amount.key
        },
        {
          label: RANGE_METHOD.percent.label,
          value: RANGE_METHOD.percent.key
        },
        {
          label: RANGE_METHOD.match.label,
          value: RANGE_METHOD.match.key
        }
      ]
    }),
    [name]
  )

  // RENDER
  return (
    <Form.Body>
      <Form.Checklist
        name={inputName('method', name)}
        label={{
          className: 'input-label-unstyled',
          label
        }}
        type="radio"
        options={options.method}
        list={{
          direction: 'vertical'
        }}
        required
      />
      <Form.Checklist
        name={inputName('imv_range_method', name, 'imv_pricing_method')}
        label={{
          className: 'input-label-unstyled',
          label: 'Set IMV Label Range',
          position: 'above'
        }}
        type="radio"
        options={options.rangeMethod}
        list={{
          cols: {
            xs: 24,
            lg: 8
          }
        }}
        fullWidth
        required={method === GOAL_METHODS.imvLabel.key}
        disabled={method !== GOAL_METHODS.imvLabel.key}
      />
      <AboveBelow
        name={{
          method: inputName('imv_comparison_method', name, 'imv_pricing_method'),
          amount: inputName('imv_amount', name, 'imv_pricing_method')
        }}
        label={{
          className: 'input-label-unstyled',
          label: 'Amount of IMV Range',
          position: 'above'
        }}
        method={imv_range_method}
        required={imv_range_method && imv_range_method !== RANGE_METHOD.match.key}
        disabled={!imv_range_method || imv_range_method === RANGE_METHOD.match.key}
      />
    </Form.Body>
  )
}
