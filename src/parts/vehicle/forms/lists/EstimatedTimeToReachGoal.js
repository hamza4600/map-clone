import React, { useEffect } from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';
import { connect } from 'react-redux';
import { compose } from 'redux';

// LOCAL COMPONENTS
import InfoBox from '../../tools/InfoBox';

// MAIN COMPONENT
export default compose(
  connect(
    ({ record }) => ({ record })
  )
)(({
  timeToReachGoal = {},
  updateState,
  // REDUX STATE
  record: {
    imvPricing = {}
  }
}) => {

  // FORM CONTEXT
  const {
    values: {
      time_to_reach_goal
    } = {}
  } = useFormikContext() || {};

  // MEMOS
  useEffect(
    () => {
    },
    [updateState, imvPricing, time_to_reach_goal]
  )

  return (
    <InfoBox
      title="Estimated Time to Reach Goal"
    />
  )
})
