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
  initialGoalResults = {},
  updateState,
  // REDUX STATE
  record: {
    imvPricing
  }
}) => {

  // FORM CONTEXT
  const {
    values: {
      initial_goal
    } = {}
  } = useFormikContext() || {};

  // EFFECTS
  useEffect (
    () => {

      const {
        method,
        price,
        imv_label,
        amount_of_imv_range = {}
      } = initial_goal || {};

      let fromPrice;
      switch (method) {
        case GOAL_METHODS.price:
          fromPrice = price;
          break;
        case GOAL_METHODS.imvLabel:
          const pricePoint = Object.keys(PRICE_POINTS).find(key => PRICE_POINTS[key].key === imv_label);
          fromPrice = imvPricing && pricePoint ? imvPricing[PRICE_POINTS[pricePoint].propertyKey] : '';
          break;
        default:
      }

      const imvFair = imvPricing ? imvPricing[PRICE_POINTS.fair.propertyKey] : undefined;
      const imvFairDifference = fromPrice ? fromPrice - imvFair : '';
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
      const addsDeductsDifference = addsDeducts / imvFair;

      const initalPrice = fromPrice ? parseFloat(fromPrice) + addsDeducts : '';

      const imvGreat = imvPricing ? imvPricing[PRICE_POINTS.great.propertyKey] : undefined;
      const imvGreatDifference = fromPrice ? fromPrice - imvGreat : '';
      const imvGreatPercent = 100 * imvGreatDifference / imvGreat;

      updateState({
        fromPrice,
        imvFair,
        imvFairDifference,
        imvFairPercent,
        addsDeducts,
        addsDeductsDifference,
        initalPrice,
        imvGreat,
        imvGreatDifference,
        imvGreatPercent
      })
    },
    [updateState, imvPricing, initial_goal]
  )

  return (
    <InfoBox
      title="Initial Goal Results"
    >
      <InfoBox.Item
        label="Price Entered"
      >
        <Number
          schema="dollars"
          value={initialGoalResults.fromPrice}
        />
      </InfoBox.Item>
      <InfoBox.Item
        label="IMV Fair"
      >
        <Number
          schema="dollars"
          value={initialGoalResults.imvFair}
        />
        &nbsp;/&nbsp;
        <Number
          className="text-secondary"
          schema="dollarsAboveBelow"
          value={initialGoalResults.imvFairDifference}
        />
      </InfoBox.Item>
      <InfoBox.Item
        label="% of IMV Fair"
      >
        <Number
          schema="percentAboveBelow"
          value={initialGoalResults.imvFairPercent}
        />
      </InfoBox.Item>
      <InfoBox.Item
        label="Adds/Deducts"
      >
        <Number
          schema="dollarsVariant"
          value={initialGoalResults.addsDeducts}
        />
      </InfoBox.Item>
      <InfoBox.Item
        label="% of IMV Fair"
      >
        <Number
          schema="percentAboveBelow"
          value={initialGoalResults.addsDeductsDifference}
        />
      </InfoBox.Item>
      <InfoBox.Item
        label="Initial Price"
      >
        <Number
          schema="dollars"
          value={initialGoalResults.initalPrice}
        />
      </InfoBox.Item>
      <InfoBox.Item
        label="IMV Great"
      >
        <Number
          schema="dollars"
          value={initialGoalResults.imvGreat}
        />
        &nbsp;/&nbsp;
        <Number
          className="text-secondary"
          schema="dollarsAboveBelow"
          value={initialGoalResults.imvGreatDifference}
        />
      </InfoBox.Item>
      <InfoBox.Item
        label="% of IMV Great"
      >
        <Number
          schema="percentAboveBelow"
          value={initialGoalResults.imvGreatPercent}
        />
      </InfoBox.Item>
    </InfoBox>
  )
})
