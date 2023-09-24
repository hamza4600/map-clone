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
const PARENT = 'condition';

// CHILD COMPONENT
const RepairCost = ({
  name,
  label,
  labels = {},
}) => {

  // FORM CONTEXT
  const { values } = useFormikContext() || {};

  // MEMOS
  const damage = useMemo(
    () => get(values, inputName(`${name}_cosmetic_damage`, PARENT)),
    [name, values]
  )

  // RENDER
  return (
    <>
      <Form.YesNo
        name={inputName(`${name}_cosmetic_damage`, PARENT)}
        label={{
          className: 'input-label-unstyled',
          label: labels.enable || `Is there any ${label} cosmetic damages?`
        }}
        justify="right"
        required
      />
      <Form.Control
        name={inputName(`${name}_cosmetic_damage_repair_cost`, PARENT)}
        label={{
          className: 'input-label-unstyled',
          label: labels.amount || `Enter the ${label} cosmetic damage repair cost`
        }}
        schema="dollars"
        justify="right"
        disabled={!damage}
        required={damage}
      />
      <AmountPercentAuto
        name={inputName(`${name}_cosmetic_damage_deduction`, PARENT)}
        label={labels.deduction || `Enter amount to deduct from the IMV for ${label} cosmetic damage:`}
        disabled={!damage}
        required={damage}
      />
    </>
  )
}

// MAIN COMPONENT
export default () => (
  <Page.Module>
    <Page.Module.Header>Condition</Page.Module.Header>
    <Form.Body>
      <RepairCost
        name="previous"
        label="Previous"
        labels={{
          enable: 'Was there any previous cosmetic damage that has been repaired?',
          amount: 'How much was the repair cost?'
        }}
      />
      <Page.Module.Divider />
      <RepairCost
        name="existing"
        label="Existing"
        labels={{
          amount: 'Enter amount of repair needed:'
        }}
      />
    </Form.Body>
  </Page.Module>
)
