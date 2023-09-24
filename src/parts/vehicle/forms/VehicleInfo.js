import React from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import Page from 'parts/page/Page';
import VINDecoder from '../tools/VINDecoder';

// MAIN COMPONENT
export default compose(
  connect(
    ({ lookups }) => ({ lookups })
  )
)(({
  // REDUX STATE
  lookups: {
    exteriorColors,
    interiorColors
  },
}) => (
  <Page.Module>
    <Form.Body
      formGroup={{
        cols: {
          xs: 24,
          md: 12,
          xl: 8
        }
      }}
      fullWidth
    >
      <VINDecoder
        name="vin"
        label={{
          label: 'VIN',
          cols: {
            xs: 24,
            lg: 4
          }
        }}
        required
        formGroup={{
          cols: {
            xs: 24,
            xl: 16
          }
        }}
      />
      <Page.Module.Divider />
      <Form.Control
        name="year"
        label="Year"
        schema="year"
        required
      />
      <Form.Control
        name="make"
        label="Make"
        required
      />
      <Form.Control
        name="model"
        label="Model"
        required
      />
      <Page.Module.Divider />
      <Form.Control
        name="trim"
        label="Trim"
        required
      />
      <Form.Select
        name="exterior_color"
        label="Exterior Color"
        options={exteriorColors}
        filterOptions
        required
      />
      <Form.Select
        name="interior_color"
        label="Interior Color"
        options={interiorColors}
        filterOptions
        required
      />
      <Page.Module.Divider />
      <Form.Control
        name="mileage"
        label="Miles"
        schema="miles"
        required
      />
      <Form.Control
        name="stock_no"
        label="Stock#"
        required
      />
      <Form.Date
        name="purchased_date"
        label="Date Purchased"
        maxDate={new Date()}
        required
      />
      <Form.Select
        name="vehicle_purchase_source_id"
        label="Purchase Source"
        lookup="purchaseSource"
        optionKeys={{
          label:    'purchase_source',
          value:    'vehicle_purchase_source_id'
        }}
        required
      />
    </Form.Body>
  </Page.Module>
))
