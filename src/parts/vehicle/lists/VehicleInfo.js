import React from 'react';

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Page from 'parts/page/Page';

// LOCAL COMPONENTS
import Info from '../tools/Info';

// MAIN COMPONENT
export default props => (
  <Page.Module>
    <Page.Module.Header>Vehicle Info</Page.Module.Header>
    <Row>
      <Col
        xs={24}
        lg={12}
      >
        <Info
          value={props.vehicle_id}
          label="#"
        />
        <Info
          value={props.vin}
          label="VIN"
        />
        <Info
          value={props.stock_no}
          label="Stock#"
        />
        <Info
          value={props.year}
          label="Year"
        />
        <Info
          value={props.make}
          label="Make"
        />
        <Info
          value={props.model}
          label="Model"
        />
        <Info
          value={props.trim}
          label="Trim"
        />
        <Info
          value={props.exterior_color}
          label="Exterior Color"
        />
        <Info
          value={props.interior_color}
          label="Interior Color"
        />
        <Info
          value={props.mileage}
          label="Miles"
          schema="miles"
        />
      </Col>
      <Col
        xs={24}
        lg={12}
      >
        <Info
          value={props.age}
          label="Age"
        />
        <Info
          value={props.purchased_date}
          label="Date Purchased"
          format="date"
        />
        <Info
          value={props.vehicle_purchase_source_id}
          label="Purchase Source"
          lookup="purchaseSource"
          optionKeys={{
            label:    'purchase_source',
            value:    'vehicle_purchase_source_id'
          }}
        />
        <Info
          value={props.date_added}
          label="Date Added"
          format="date"
        />
        <Info
          value={props.original_acv}
          label="Original ACV"
          schema="dollars"
        />
        <Info
          value={props.dms_cost}
          label="DMS Cost"
          schema="dollars"
        />
        <Info
          value={props.acv_dms_difference}
          label="Original ACV vs DMS Cost"
          schema="dollars"
        />
        <Info
          value={props.average_difference}
          label="Current Average of Difference"
          schema="dollars"
        />
        <Info
          value={props.above_below_average}
          label="$ Amount Above / Below Average"
          schema="dollars"
        />
      </Col>
    </Row>
  </Page.Module>
)
