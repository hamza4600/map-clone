import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// HELPERS
import { getIMVPricing } from '../helpers/getIMVPricing.js';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Number from 'core/tools/Number';

// LOCAL COMPONENTS
import Page from 'parts/page/Page';

// STYLES
import styles from './imvPricing.module.scss';

// MAIN COMPONENT
export default compose(
  getIMVPricing,
  connect(
    ({ record }) => ({ record })
  )
)(({
  title,
  // REDUX STATE
  record: {
    msrp_factory_invoice = {},
    cpo = {}
  } = {}
}) => (
  <Page.Module>
    <Form.Body.Columns>
      <Form.YesNo
        name="cpo_badge"
        label={{
          className: 'input-label-unstyled',
          label: 'Does the IMV reflect the CPO badge?',
          position: 'before'
        }}
        formGroup={{
          cols: {
            xs: 24
          }
        }}
        justify="right"
        disabled={!cpo.eligible}
        required={cpo.eligible}
      />
      <Form.YesNo
        name="factory_equipments_all_selected"
        label={{
          className: 'input-label-unstyled',
          label: (
            <span>
              Are all the factory equipments selected?<br />
              {msrp_factory_invoice.factory_invoice && msrp_factory_invoice.factory_invoice.factory_options &&
                <>
                  <strong>HINT:</strong> This vehicle has factory options of <Number
                    className="text-accent"
                    value={msrp_factory_invoice.factory_invoice.factory_options.amount}
                    schema="dollars"
                  />
                </>
              }
            </span>
          ),
          position: 'before'
        }}
        formGroup={{
          cols: {
            xs: 24
          }
        }}
        justify="right"
        required
      />
      <Form.Control
        name="great_price"
        label={{
          label: 'IMV Great',
          position: 'before'
        }}
        schema="dollars"
        required
      />
      <Form.Control
        name="good_price"
        label={{
          label: 'IMV Good',
          position: 'before'
        }}
        schema="dollars"
        required
      />
      <Form.Control
        name="fair_price"
        label={{
          label: 'IMV Fair',
          position: 'before'
        }}
        schema="dollars"
        required
      />
      <Form.Control
        name="high_price"
        label={{
          label: 'IMV High',
          position: 'before'
        }}
        schema="dollars"
        required
      />
      <Form.Control
        name="overpriced_price"
        label={{
          label: 'IMV Overpriced',
          position: 'before'
        }}
        schema="dollars"
        required
      />
      <Form.Upload
        name="imv_proof_screen_capture_file"
        label={{
          label: 'Please Upload Proof of IMV',
          className: clsx(
            'input-label-unstyled',
            styles.uploadLabel
          ),
          position: 'before'
        }}
        endpoints={ENDPOINTS.vehicle.document}
        accept="image/*"
      />
    </Form.Body.Columns>
    <Page.Module.Divider />
    <Form.Body>
      <Form.Control
        name="imv_uri"
        label="URL of IMV"
        fullWidth
      />
      <Form.Control
        name="vehicle_detail_uri"
        label="URL of Vehicle detail"
        fullWidth
      />
    </Form.Body>
  </Page.Module>
))
