import React, { useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { useFormikContext } from 'formik';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';

// FUNCTIONS
import { inputName } from 'functions.js';

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Number from 'core/tools/Number';
import Page from 'parts/page/Page';
import Adjustment from 'tools/Adjustment';

// STYLES
import styles from './mileage.module.scss';

// LOCAL VARIABLES
const PARENT = 'mileage';
const MILES_PER_YEAR = 15000;

// MAIN COMPONENT
export default compose(
  connect(
    ({ record }) => ({ record })
  )
)(({
  record: {
    vehicle_info: {
      purchased_date,
      original_purchased_date = '2/2/2020',
      mileage
    } = {},
  }
}) => {

  // FORM CONTEXT
  const { values } = useFormikContext() || {};

  // MEMOS
  const rate = useMemo(
    () => get(values, inputName('amount_per_mileage_adjustment', PARENT)),
    [values]
  )
  const age = useMemo(
    () => (new Date(purchased_date).getTime() - new Date(original_purchased_date).getTime()) / (1000 * 60 * 60 * 24 * 365.25),
    [purchased_date, original_purchased_date]
  )
  const averageMileage = useMemo(
    () => age * MILES_PER_YEAR,
    [age]
  )
  const mileageDifference = useMemo(
    () => averageMileage - mileage,
    [mileage, averageMileage]
  )
  const mileageAdjustment = useMemo(
    () => mileageDifference * rate,
    [rate, mileageDifference]
  )

  // RENDER
  return (
    <Page.Module>
      <Page.Module.Header>Mileage</Page.Module.Header>
      <Row>
        <Col xs={24} lg={12}>
          <div className={styles.mileageInfo}>
            <dl>
              <dt>Current Mileage:</dt>
              <dd>
                <Number
                  className="text-primary"
                  value={isNaN(mileage) ? undefined : mileage}
                  schema="miles"
                />
              </dd>
            </dl>
            <dl>
              <dt>Average Mileage (Based on {parseFloat(MILES_PER_YEAR/1000)}k/Yr):</dt>
              <dd>
                <Number
                  className="text-primary"
                  value={isNaN(averageMileage) ? undefined : averageMileage}
                  schema="miles"
                />
              </dd>
            </dl>
            <dl>
              <dt>Mileage Difference:</dt>
              <dd>
                <Number
                  className="text-primary"
                  value={isNaN(mileageDifference) ? undefined : mileageDifference}
                  schema="miles"
                />
              </dd>
            </dl>
          </div>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Body>
            <Form.Dollar
              name={inputName('amount_per_mileage_adjustment', PARENT)}
              label={{
                className: 'input-label-unstyled',
                label: 'Enter $ Per Mileage Adjustment:',
                cols: {
                  xs: 24,
                  lg: 'auto'
                }
              }}
              min={0.01}
              max={2.00}
              useCents
            />
          </Form.Body>
          <Page.Module.Divider className={styles.divider} />
          <>
            <dl
              className={clsx(
                styles.adjustment,
                mileageAdjustment > 0 && styles.positive,
                mileageAdjustment < 0 && styles.negative,
              )}
            >
              <dt>Total $ Mileage Adjustment:</dt>
              <dd>
                <Adjustment
                  value={isNaN(mileageAdjustment) ? undefined : mileageAdjustment}
                />
              </dd>
            </dl>
          </>
        </Col>
      </Row>
    </Page.Module>
  )
})
