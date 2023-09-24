import React, { useCallback, useReducer } from 'react';

// DEPENDENCIES
// import clsx from 'clsx';
import { useFormikContext } from 'formik';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// HELPERS
import { getIMVPricing } from '../helpers/getIMVPricing.js';

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Page from 'parts/page/Page';

// LOCAL COMPONENTS
import EstimatedTimeToReachGoal from './lists/EstimatedTimeToReachGoal';
import InitialGoalResults from './lists/InitialGoalResults';
import TargetGoalResults from './lists/TargetGoalResults';
import PricingStrategyGoal from './parts/PricingStrategyGoal';
import PublishFrequency from './parts/PublishFrequency';
import Stagger from './parts/Stagger';
import TimeToReachGoal from './parts/TimeToReachGoal';
import PricingStrategyButtons from '../tools/PricingStrategyButtons';

// TABLE COMPONENTS
import InitialIMVAfterAddsDeducts from '../tables/InitialIMVAfterAddsDeducts';
import InitialIMVAfterAddsDeductsStrategy from '../tables/InitialIMVAfterAddsDeductsStrategy';
import InitialIMVAfterPricingStrategy from '../tables/InitialIMVAfterPricingStrategy';

// STYLES
// import styles from './pricingStrategy.module.scss';

// REDUCER
const reducer = (state, action) => {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        [action.key]: action.data
      }
    default:
      return state;
  }
}

// MAIN COMPONENT
export default compose(
  getIMVPricing
)(({
  initial = false,
  disabled
}) => {

  // FORM CONTEXT
  const { values: {
    vehicle_pricing = {}
  } } = useFormikContext() || {};

  // STATE
  const [state, dispatch] = useReducer(reducer, {});

  // CALLBACKS
  const updateState =  useCallback(
    (key, data) => {
      dispatch({
        type: 'update',
        key,
        data
      })
    },
    [dispatch]
  )
  const updateInitialGoalResults =  useCallback(
    data => updateState('initialGoalResults', data),
    [updateState]
  )
  const updateTargetGoalResults =  useCallback(
    data => updateState('targetGoalResults', data),
    [updateState]
  )
  const updateTimeToReachGoal =  useCallback(
    data => updateState('timeToReachGoal', data),
    [updateState]
  )

  // RENDER
  return (
    <>
      <Page.Module>
        <Form.Body className="mx-n15">
          <Form.Col xs={24} md={6}>
            <Form.Row>
              <Form.Date
                name="vehicle_pricing.strategy_start_date"
                label={{
                  label: 'Strategy Start Date',
                  position: 'above'
                }}
                disabled={disabled}
                required
              />
            </Form.Row>
          </Form.Col>
          <Form.Col xs={24} md={18}>
            <Form.Row>
              <PricingStrategyButtons
                name="vehicle_pricing.pricing_strategy_id"
                lookupArgs={{
                  endpoint: ENDPOINTS.lookup.discountStrategy,
                  key: 'discountStrategy',
                  label: 'discount_strategy',
                  value: 'discount_strategy_id'
                }}
                disabled={disabled}
                required
              />
            </Form.Row>
          </Form.Col>
        </Form.Body>
      </Page.Module>
      {vehicle_pricing.discount_strategy_id && <>
        <Page.Module>
          <Row>
            <Col xs={24} md={12}>
              <h3>Initial Goal</h3>
              <PricingStrategyGoal
                name="initial_goal"
                label="From"
                disabled={disabled || !vehicle_pricing.discount_strategy_id}
              />
            </Col>
            <Col xs={24} md={12}>
              <InitialGoalResults
                {...state}
                updateState={updateInitialGoalResults}
              />
            </Col>
          </Row>
          <Page.Module.Divider />
          <Row>
            <Col xs={24} md={12}>
              <h3>Target Goal</h3>
              <PricingStrategyGoal
                name="target_goal"
                label="To"
                disabled={disabled || !vehicle_pricing.discount_strategy_id}
              />
            </Col>
            <Col xs={24} md={12}>
              <TargetGoalResults
                {...state}
                updateState={updateTargetGoalResults}
              />
            </Col>
          </Row>
          <Page.Module.Divider />
          <Row>
            <Col xs={24} md={12}>
              <h3>Time to Reach Goal</h3>
              <TimeToReachGoal
                disabled={disabled || !vehicle_pricing.discount_strategy_id}
              />
            </Col>
            <Col xs={24} md={12}>
              <EstimatedTimeToReachGoal
                {...state}
                updateState={updateTimeToReachGoal}
              />
            </Col>
          </Row>
          <Page.Module.Divider />
          <Form.Body>
            <Stagger />
            <PublishFrequency />
          </Form.Body>
        </Page.Module>
        <InitialIMVAfterAddsDeducts />
        <InitialIMVAfterPricingStrategy />
        <InitialIMVAfterAddsDeductsStrategy />
      </>}
    </>
  )
})
