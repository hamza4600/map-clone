import React, { useCallback, useEffect, useState } from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// FUNCTIONS
import { lookupActions } from 'actions.js';
import { apiFetch, getEnv, makePath, modalFunctions } from 'functions.js';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// MAIN COMPONENT
export default compose(
  connect(
    null,
    { ...lookupActions }
  )
)(({
  // REDUX DISPATCH
  load,
  error,
  flush,
  // REST
  ...props
}) => {

  // FORM CONTEXT
  const { setValues, values } = useFormikContext();

  // PROPS
  const {
    name,
    value,
    debug
  } = props;

  // STATE
  const [ vin, setVIN ] = useState(value);

  // CALLBACK
  const handleChange = useCallback(
    target => setVIN(target.value),
    [setVIN]
  )
  const handleSuccess = useCallback(
    ({
      year,
      make,
      model,
      trim,
      exterior_colors = [],
      interior_colors = []
    }) => {
      setValues({
        ...values,
        year,
        make,
        model,
        trim
      })
      load('exteriorColors', exterior_colors)
      load('interiorColors', interior_colors)
    },
    [load, setValues, values]
  )
  const handleClick = useCallback(
    () => {

      if (!vin) modalFunctions.warning('Please enter a VIN.');

      else apiFetch({
        method: 'GET',
        path: '',
        key: getEnv('vin'),
        endpoint: makePath(ENDPOINTS.vehicle.decodeVIN, vin),
        onSuccess: handleSuccess,
        loadingMessage: 'Decoding VIN',
        successMessage: 'VIN Decoded.',
        errorMessage: 'Unable to Decode VIN.',
        debug
      })
    },
    [debug, vin, handleSuccess]
  )

  // EFFECTS
  useEffect(
    () => () => {
      flush('exteriorColors');
      flush('interiorColors');
    },
    [name, flush]
  )

  // RENDER
  return (
    <Form.Control
      append={{
        children:  'Decode VIN',
        className: 'text-accent',
        onClick:   handleClick
      }}
      onValueChange={handleChange}
      {...props}
    />
  )
})
