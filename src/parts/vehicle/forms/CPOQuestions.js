import React, { useMemo } from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';
import { get } from 'lodash';

// FUNCTIONS
import { inputName } from 'functions.js';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Page from 'parts/page/Page';

// LOCAL COMPONENTS
import AmountPercentAuto from './parts/AmountPercentAuto';

// LOCAL VARIABLES
const PARENT = 'cpo';

// MAIN COMPONENT
export default () => {

  // FORM CONTEXT
  const { values } = useFormikContext() || {};

  // MEMOS
  const cpo = useMemo(
    () => get(values, inputName('eligible', PARENT)),
    [values]
  )

  // RENDER
  return (
    <Page.Module>
      <Page.Module.Header>CPO</Page.Module.Header>
      <Form.Body>
        <Form.YesNo
          name={inputName('eligible', PARENT)}
          label={{
            className: 'input-label-unstyled',
            label: 'Is this a CPO Vehicle?'
          }}
          justify="right"
          required
        />
        <Form.Control
          name={inputName('cost', PARENT)}
          label={{
            className: 'input-label-unstyled',
            label: 'What is the cost for CPO?'
          }}
          schema="dollars"
          justify="right"
          disabled={!cpo}
          required={cpo}
        />
        <AmountPercentAuto
          name={inputName('adjustment', PARENT)}
          label="Enter amount to add for CPO:"
          disabled={!cpo}
          required={cpo}
        />
      </Form.Body>
    </Page.Module>
  )
}
