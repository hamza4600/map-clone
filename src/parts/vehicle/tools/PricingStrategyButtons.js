import React, { useCallback } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { useFormikContext } from 'formik';
import { findKey } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';

// GLOBAL VARIABLES
import { DISCOUNT_STRATEGIES } from 'globals.js';

// HELPERS
import { mountLog } from 'helpers/mountLog';
import { formikField } from 'core/form/control/helpers/formik/formikField';
import { formGroup } from 'core/form/control/helpers/layout/formGroup';
import { inputState } from 'core/form/control/helpers/state/inputState';

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Sprite from 'core/tools/Sprite';

// STYLES
import styles from './pricingStrategyButtons.module.scss';

// LOCAL VARIABLES
export const SPRITES = {
  linear: {
    use: 'linear'
  },
  gradual: {
    use: 'gradual'
  },
  aggressive: {
    use: 'aggressive'
  },
  none: {
    use: 'none',
    useStroke: false
  }
}

// MAIN COMPONENT
export default compose(
  mountLog,
  formikField,
  inputState,
  formGroup,
  connect(
    ({ lookups }) => ({ lookups })
  )
)(({
  name,
  label = <>Select type of <br className="d-none d-lg-block" />discount strategy:</>,
  options = [
    {
      value: 1,
      label: 'Linear'
    },
    {
      value: 2,
      label: 'Gradual'
    },
    {
      value: 3,
      label: 'Aggressive'
    }
  ],
  disabled,
  hasError,
  // REDUX STATE
  lookups
}) => {

  // FORM CONTEXT
  const {
    values: {
      vehicle_pricing: {
        discount_strategy_id,
        ...vehicle_pricing
      } = {}
    },
    setFieldValue,
    setFieldTouched
  } = useFormikContext() || {};

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

  // CALLBACKS
  const handleClick = useCallback(
    discount_strategy_id => {
      setFieldTouched('vehicle_pricing');
      setFieldValue('vehicle_pricing', {
        ...vehicle_pricing,
        discount_strategy_id
      });
    },
    [vehicle_pricing, setFieldValue, setFieldTouched]
  )

  return (
    <div className={clsx(
      styles.container,
      !!hasError && styles.error
    )}>
      <span className={clsx(
        styles.label,
        !!disabled && styles.disabled
      )}>{label}</span>
      <Row className={clsx(
        'form-row',
        styles.row
      )}>
        {[
          ...options,
          {
            label: 'None'
          }
        ].map(({
          label,
          value
        }, i) => {

          const lookupObj = discountStrategies.find(discountStrategy => discountStrategy.discount_strategy_id === value) || {};
          const discountStrategy = findKey(DISCOUNT_STRATEGIES, key => key === lookupObj.char_key) || 'none';

          return (
            <Col
              key={i}
              className={styles.col}
              xs={12}
              md={6}
            >
              <Button
                className={clsx(
                  styles.btn,
                  !!disabled && styles.disabled,
                  value === discount_strategy_id && styles.active
                )}
                variant="custom"
                onClick={() => handleClick(value)}
                round={false}
                disabled={disabled}
              >
                <div className={styles.labelContainer}>
                  <Sprite
                    as={false}
                    className={styles.sprite}
                    height={22}
                    width={80}
                    size="lg"
                    useStroke
                    {...SPRITES[discountStrategy]}
                  />
                  <span className={styles.btnLabel}>{label}</span>
                </div>
              </Button>
            </Col>
          )
        })}
      </Row>
    </div>
  )
})
