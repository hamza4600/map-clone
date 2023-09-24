import React, { useMemo } from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';
import { get } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';

// GLOBAL VARIABLES
import { DISCOUNT_STRATEGIES } from 'globals.js';

// GLOBAL FUNCTIONS
import { inputName } from 'functions.js';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// MAIN COMPONENT
export default compose(
  connect(
    ({ lookups }) => ({ lookups })
  )
)(({
  cols = {
    xs: 24,
    lg: 18
  },
  required,
  // REDUX STATE
  lookups
}) => {

  // PROPS
  //  const discountStrategies = lookups.discountStrategy || [];
  const discountStrategies = [
    {
      discount_strategy_id: 1,
      char_key: 'LINEAR',
      discount_strategy: 'Linear'
    },
    {
      discount_strategy_id: 2,
      char_key: 'GRADUL',
      discount_strategy: 'Gradual'
    },
    {
      discount_strategy_id: 3,
      char_key: 'AGRSIV',
      discount_strategy: 'Aggressive'
    }
  ]

  // FORM CONTEXT
  const { values } = useFormikContext() || {};

  // MEMOS
  const discountStrategyID = useMemo(
    () => get(values, 'vehicle_pricing.discount_strategy_id'),
    [values]
  )
  const disabled = useMemo(
    () => !get(values, 'publish_policy.stagger'),
    [values]
  )
  const options = useMemo(
    () => ({
      rangeMethod: [
        {
          label: 'High',
          value: 'H'
        },
        {
          label: 'Medium',
          value: 'M'
        },
        {
          label: 'Low',
          value: 'L'
        },
        {
          label: 'Auto',
          value: 'A'
        }
      ],
    }),
    []
  )
  const useBreakpoint = useMemo(
    () => {
      const lookupObj = discountStrategies.find(discountStrategy => discountStrategy.discount_strategy_id === discountStrategyID) || {};
      return ['gradual', 'aggressive'].find(strategy => lookupObj.char_key === DISCOUNT_STRATEGIES[strategy]);
    },
    [discountStrategies, discountStrategyID]
  )

  return (<>
    {useBreakpoint && (<>
      <Form.Control
        name={inputName('breakpoint_days', 'publish_policy')}
        label={{
          className: 'input-label-unstyled',
          label: 'Days to Remain Gradual'
        }}
        schema="days"
      />
      <Form.Control
        name={inputName('breakpoint_percent', 'publish_policy')}
        label={{
          className: 'input-label-unstyled',
          label: 'Gradual % Application'
        }}
        schema="percent"
      />
    </>)}
    <Form.YesNo
      name={inputName('stagger', 'publish_policy')}
      label={{
        className: 'input-label-unstyled',
        label: 'Stagger'
      }}
    />
    <Form.Checklist
      name={inputName('stagger_range_method', 'publish_policy')}
      label={{
        className: 'input-label-unstyled',
        label: 'Stagger Range'
      }}
      type="radio"
      options={options.rangeMethod}
      list={{
        cols: {
          xs: 12,
          lg: 6
        }
      }}
      fullWidth
      disabled={disabled}
    />
  </>)
})
