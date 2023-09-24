import React, { useCallback, useMemo } from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// FUNCTIONS
import { inputName } from 'functions.js';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Page from 'parts/page/Page';

// STYLES
import styles from './warranty.module.scss';

// LOCAL VARIABLES
const PARENT = 'warranty';

// CHILD COMPONENT
const MileMonthsRemaining = compose(
  connect(
    ({ mobile }) => ({ mobile })
  )
)(({
  name,
  label,
  disabled,
  required = !disabled,
  // REDUX STATE
  mobile
}) => {

  // MEMOS
  const as = useCallback(
    () => (
      <Form.Body
        className={styles.inline}
        inline={!mobile}
      >
        <Form.Control
          name={inputName('months', PARENT, name)}
          label={{
            label: mobile ? `${label} Months Remaining` : <>Months<br /> Remaining</>,
            position: mobile ? 'before' : undefined
          }}
          inputGroup={{
            className: styles.inlineGroup
          }}
          type="number"
          disabled={disabled}
          required={required}
        />
        <Form.Control
          name={inputName('miles', PARENT, name)}
          label={{
            label: mobile ? `${label} Miles Remaining` : <>Miles<br /> Remaining</>,
            position: mobile ? 'before' : undefined
          }}
          inputGroup={{
            className: styles.inlineGroup
          }}
          schema="miles"
          disabled={disabled}
          required={required}
        />
      </Form.Body>
    ),
    [name, label, disabled, required, mobile]
  )

  // RETURN
  return (
    <Form.Control
      as={as}
      label={{
        className: 'input-label-unstyled',
        label: mobile ? undefined : label,
        position: 'before',
        cols: {
          xs: 24,
          md: 5
        }
      }}
      disabled={disabled}
      justify="right"
      fullWidth
    />
  )
})

// MAIN COMPONENT
export default () => {

  // FORM CONTEXT
  const { values } = useFormikContext() || {};

  // MEMOS
  const warranty = useMemo(
    () => get(values, inputName('factory_warranty', PARENT)),
    [values]
  )

  // RENDER
  return (
    <Page.Module>
      <Page.Module.Header>Warranty</Page.Module.Header>
      <Form.Body>
        <Form.YesNo
          name={inputName('factory_warranty', PARENT)}
          label={{
            className: 'input-label-unstyled',
            label: 'Under Factory Warranty?',
            position: 'before'
          }}
          justify="right"
        />
        <MileMonthsRemaining
          name="bb_warranty_remaining"
          label="Limited New Car Warranty"
          disabled={!warranty}
        />
        <MileMonthsRemaining
          name="powertrain_warranty_remaining"
          label="Powertrain Warranty"
          disabled={!warranty}
        />
        <Form.Date
          name={inputName('service_date', PARENT)}
          label={{
            className: 'input-label-unstyled',
            label: 'Approximate In Service Date',
            position: 'before'
          }}
          maxDate={new Date()}
          disabled={!warranty}
          required={warranty}
          justify="right"
        />
        <Form.Upload
          name={inputName('file_name', PARENT)}
          label={{
            className: 'input-label-unstyled',
            label: 'Please Upload Warranty',
            position: 'before'
          }}
          endpoints={ENDPOINTS.vehicle.document}
          disabled={!warranty}
          justify="right"
        />
      </Form.Body>
    </Page.Module>
  )
}
