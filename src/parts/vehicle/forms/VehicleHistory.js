import React, { useMemo } from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';
import { get } from 'lodash';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// FUNCTIONS
import { inputName } from 'functions.js';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Page from 'parts/page/Page';

// LOCAL COMPONENTS
import AmountPercentAuto from './parts/AmountPercentAuto';

// LOCAL VARIABLES
const PARENT = 'vehicle_history';

// CHILD COMPONENT
const History = ({
  name,
  label,
  uploadRequired
}) => {

  // FORM CONTEXT
  const { values } = useFormikContext() || {};

  // MEMOS
  const {
    clean,
    branded,
    accident
  } = useMemo(
    () => ({
      clean:    get(values, inputName('clean', name)),
      branded:  get(values, inputName('title_branded', name)),
      accident: get(values, inputName('accident_indicator', name))
    }),
    [name, values]
  )

  // RENDER
  return (
    <>
      <Form.YesNo
        name={inputName('clean', name)}
        label={{
          className: 'input-label-unstyled',
          label: `Clean ${label}?`
        }}
        justify="right"
        required
      />
      <Form.YesNo
        name={inputName('title_branded', name)}
        label={{
          className: 'input-label-unstyled',
          label: `${label} Title Branded?`
        }}
        justify="right"
        disabled={clean !== false}
        required={clean === false}
      />
      <AmountPercentAuto
        name={inputName('title_branded_deduction', name)}
        label="Enter amount to deduct from Market Value for the Branded Title:"
        disabled={!branded}
        required={branded}
      />
      <Form.YesNo
        name={inputName('accident_indicator', name)}
        label={{
          className: 'input-label-unstyled',
          label: `${label} Accident Indicator?`
        }}
        justify="right"
        disabled={clean !== false}
        required={clean === false}
      />
      <AmountPercentAuto
        name={inputName('accident_indicator_deduction', name)}
        label="Enter amount to deduct from Market Value for the Accident Indicator:"
        disabled={!accident}
        required={accident}
      />
      <Form.Upload
        name={inputName('file_name', name)}
        label={{
          className: 'input-label-unstyled',
          label: `Please Scan/Upload the ${label} Report`
        }}
        endpoints={ENDPOINTS.vehicle.document}
        justify="right"
        //required={uploadRequired}
      />
    </>
  )
}


// CHILD COMPONENT
const Owners = ({
  name
}) => {

  // FORM CONTEXT
  const { values } = useFormikContext() || {};

  // MEMOS
  const disabled = useMemo(
    () => {
      const owners = get(values, inputName('total_owners', name));
      return !owners || owners === '' || owners === 1;
    },
    [name, values]
  )

  // RENDER
  return (
    <>
      <Form.Select
        name={inputName('total_owners', name)}
        label={{
          className: 'input-label-unstyled',
          label: 'How Many Owners?'
        }}
        options={[1, 2, 3, '4+']}
        justify="right"
        required
      />
      <AmountPercentAuto
        name={inputName('multiple_owner_deduction', name)}
        label="Enter amount to deduct from Market Value for the Previous Owners:"
        disabled={disabled}
        required={!disabled}
      />
    </>
  )
}

// MAIN COMPONENT
export default () => (
  <Page.Module>
    <Page.Module.Header>Vehicle History</Page.Module.Header>
    <Form.Body>
      <History
        name={inputName('carfax', PARENT)}
        label="Carfax"
        uploadRequired
      />
      <Page.Module.Divider />
      <History
        name={inputName('autocheck', PARENT)}
        label="Autocheck"
      />
      <Page.Module.Divider />
      <Owners
        name={inputName('multiple_owner', PARENT)}
      />
    </Form.Body>
  </Page.Module>
)
