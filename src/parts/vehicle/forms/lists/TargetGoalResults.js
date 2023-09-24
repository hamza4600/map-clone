import React, { useEffect } from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';
import { connect } from 'react-redux';
import { compose } from 'redux';

// VARIABLES
import { ADD_DEDUCTS, GOAL_METHODS, PRICE_POINTS } from 'globals.js';

// GLOBAL COMPONENTS
import Number from 'core/tools/Number';

// LOCAL COMPONENTS
import InfoBox from '../../tools/InfoBox';

// MAIN COMPONENT
export default compose(
  connect(
    ({ record }) => ({ record })
  )
)(({
  initialGoalResults: {
    initalPrice
  } = {},
  targetGoalResults = {},
  updateState,
  // REDUX STATE
  record: {
    imvPricing
  }
}) => {

  // FORM CONTEXT
  const {
    values: {
      strategy_start_date,
      target_goal
    } = {}
  } = useFormikContext() || {};

  // MEMOS
  useEffect(
    () => {

      const {
        method,
        price,
        imv_label,
        amount_of_imv_range = {}
      } = target_goal || {};

      let toPrice;
      switch (method) {
        case GOAL_METHODS.price:
          toPrice = price;
          break;
        case GOAL_METHODS.imvLabel:
          const pricePoint = Object.keys(PRICE_POINTS).find(key => PRICE_POINTS[key].key === imv_label);
          toPrice = imvPricing && pricePoint ? imvPricing[PRICE_POINTS[pricePoint].propertyKey] : '';
          break;
        default:
          toPrice = initalPrice;
      }

      const toPriceDifference = toPrice - initalPrice;

      const imvFair = imvPricing ? imvPricing[PRICE_POINTS.fair.propertyKey] : undefined;
      const imvFairDifference = toPrice ? toPrice - imvFair : '';
      const imvFairPercent = 100 * imvFairDifference / imvFair;

      let addsDeducts
      switch (amount_of_imv_range.method) {
        case ADD_DEDUCTS.below:
          addsDeducts = -(amount_of_imv_range.below);
          break;
        case ADD_DEDUCTS.above:
          addsDeducts = amount_of_imv_range.above;
          break;
        default:
          addsDeducts = 0;
      }

      updateState({
        toPrice,
        toPriceDifference,
        imvFair,
        imvFairDifference,
        imvFairPercent,
        addsDeducts
      })
    },
    [initalPrice, updateState, imvPricing, target_goal]
  )

  return (
    <InfoBox
      title="Target Goal Results"
    >
      <InfoBox.Item
        label="To Price"
      >
        <Number
          schema="dollarsAboveBelow"
          value={targetGoalResults.toPriceDifference}
        />
        &nbsp;/ Calculated Price:&nbsp;
        <Number
          className="text-accent"
          schema="dollars"
          value={initalPrice}
        />
      </InfoBox.Item>
      <InfoBox.Item
        label="IMV Fair"
      >
        <Number
          schema="dollars"
          value={targetGoalResults.imvFair}
        />
        &nbsp;/&nbsp;
        <Number
          className="text-secondary"
          schema="dollarsAboveBelow"
          value={targetGoalResults.imvFairDifference}
        />
        &nbsp;<span className="text-secondary">as of</span>&nbsp;
        <Number
          className="text-secondary"
          schema="date"
          value={strategy_start_date}
        />
      </InfoBox.Item>
      <InfoBox.Item
        label="% of IMV Fair"
      >
        <Number
          schema="percentAboveBelow"
          value={targetGoalResults.imvFairPercent}
        />
      </InfoBox.Item>
      <InfoBox.Item
        label="Adds/Deducts"
      >
        <Number
          schema="dollarsVariant"
          value={targetGoalResults.addsDeducts}
        />
      </InfoBox.Item>
    </InfoBox>
  )
})
