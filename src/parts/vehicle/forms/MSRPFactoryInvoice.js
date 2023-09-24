import React, { useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { useFormikContext } from 'formik';
import { get } from 'lodash';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js'

// FUNCTIONS
import { inputName } from 'functions.js';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Number from 'core/tools/Number';
import Page from 'parts/page/Page';

// LOCAL COMPONENTS
import AmountPercentAuto from './parts/AmountPercentAuto';

// STYLES
import styles from './msrpFactoryInvoice.module.scss';

// LOCAL VARIABLES
const PARENT = 'msrp_factory_invoice';

// CHILD COMPONENT
const DocumentPrices = ({
  className,
  name,
  label,
  required
}) => {

  // FORM CONTEXT
  const { values } = useFormikContext() || {};

  // MEMOS
  const {
    total,
    base,
    provided
  } = useMemo(
    () => ({
      total:    get(values, inputName('total_amount', name)),
      base:     get(values, inputName('base_amount', name)),
      provided: get(values, inputName('provided', name))
    }),
    [name, values]
  )
  const {
    amount,
    percent
  } = useMemo(
    () => {
      if (!provided) return {};
      if (!total || !base) return {};

      const amount = total - base;
      const percent = amount * 100 / total;

      return {
        amount: isNaN(amount) ? undefined : total - base,
        percent: isNaN(percent) ? undefined : percent
      }
    },
    [total, base, provided]
  )

  // RENDER
  return (
    <>
      <Form.YesNo
        name={inputName('provided', name)}
        label={{
          className: 'input-label-unstyled',
          label: `Do we have a ${label}?`
        }}
        justify="right"
        required
      />
      <Form.Col
        xs={24}
        lg
      >
        <Form.Row>
          <Form.Control
            name={inputName('total_amount', name)}
            label={`Total ${label}`}
            schema="dollars"
            disabled={!provided}
            required={provided}
            justify="right"
          />
          <Form.Control
            name={inputName('base_amount', name)}
            label={{
              label: (<>Base {label} <br className="d-none d-lg-block" />(Without Options)</>)
            }}
            schema="dollars"
            disabled={!provided}
            required={provided}
            justify="right"
          />
        </Form.Row>
      </Form.Col>
      <div
        className={styles.divider}
      />
      <Form.Col
        className={styles.col}
        xs={24}
        lg
      >
        <Form.Row className={clsx(
          !provided && styles.disabled
        )}>
          <Form.Col xs={16}>
            <label className={styles.label}>
              Factory Options <br className="d-none d-lg-block" />Amount:
            </label>
          </Form.Col>
          <Form.Col xs={8}>
            <Number
              className={styles.number}
              value={amount}
              schema="dollars"
            />
          </Form.Col>
          <Form.Col xs={16}>
            <label className={styles.label}>
              Factory Options <br className="d-none d-lg-block" />% of {label}:
            </label>
          </Form.Col>
          <Form.Col xs={8}>
            <Number
              className={styles.number}
              value={percent}
              schema="percent"
            />
          </Form.Col>
        </Form.Row>
      </Form.Col>
      <Form.Col
        className={clsx(
          styles.col,
          !provided && styles.disabled
        )}
        xs={24}
        lg
      >
        <Form.Row>
          <Form.Col>
            <label className={styles.label}>Please Upload <br className="d-none d-lg-block" />{label}:</label>
          </Form.Col>
          <Form.Upload
            name={inputName('file_name', name)}
            endpoints={ENDPOINTS.vehicle.document}
            disabled={!provided}
          />
        </Form.Row>
      </Form.Col>
    </>
  )
}

// MAIN COMPONENT
export default () => (
  <Page.Module>
    <Page.Module.Header>MSRP and Factory Invoice</Page.Module.Header>
    <Form.Body>
      <DocumentPrices
        name={inputName('msrp', PARENT)}
        label="MSRP"
      />
      <Page.Module.Divider />
      <DocumentPrices
        name={inputName('factory_invoice', PARENT)}
        label="Factory Invoice"
      />
      <Page.Module.Divider />
      <AmountPercentAuto
        name={inputName('factory_option_imv_adjustment', PARENT)}
        label={<>Enter Factory Options <br className="d-xs-none d-lg-block" />Adjustment to IMV:</>}
        required
      />
    </Form.Body>
  </Page.Module>
)
