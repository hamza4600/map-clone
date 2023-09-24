import React, { useEffect, useMemo } from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';
import { get, isEmpty } from 'lodash';
import { withRouter } from 'react-router';
import { compose } from 'redux';

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Button from 'core/tools/Button';
import Page from 'parts/page/Page';

// LOCAL COMPONENTS
import AmountPercentAuto from './parts/AmountPercentAuto';

// STYLES
import styles from './applyAddsDeducts.module.scss';

// MAIN COMPONENT
export default compose(
  withRouter
)(({
  initialValues = {},
  // REACT ROUTER
  match: {
    params: {
      recordID
    }
  }
}) => {

  // FORM CONTEXT
  const {
    values,
    setFieldValue,
    touched
  } = useFormikContext() || {};

  // MEMOS
  const override = useMemo(
    () => get(values, 'override'),
    [values]
  )
  const method = useMemo(
    () => {
      const { override, amount, percent, auto } = initialValues;
      switch(true) {
        case !override :
          return undefined;
        case !!auto :
          return 'ARC'
        case !!amount :
          return 'AMT';
        case !!percent :
          return 'PCT';
        default:
          return;
      }
    },
    [initialValues]
  )

  //EFFECTS
  useEffect(
    () => {

    },
    [method, setFieldValue]
  )

  return (
    <Page.Module>
      <Form.Body>
        <Form.YesNo
          name="override"
          label={{
            className: 'input-label-unstyled',
            label: 'Apply Additions/Deductions?',
          }}
          justify="right"
          required
        />
        <AmountPercentAuto
          label='Enter Manual Additions/Deductions:'
          disabled={override !== false}
          required={override === false}
        />
      </Form.Body>
      <Row className={styles.footer}>
        <Col xl="4" lg="6" md="8" xs="24">
          <Button.Submit
            className="w-100"
            disabled={isEmpty(touched)}
          />
        </Col>
      </Row>
    </Page.Module>
  )
})
