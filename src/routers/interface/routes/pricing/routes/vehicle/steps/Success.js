import React from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { PATHNAMES } from 'pathnames.js';

// FUNCTIONS
import { makePath } from 'functions.js';

// MEDIA
import graphics from 'img/graphics.svg';

// CORE COMPONENTS
import Button from 'core/tools/Button';
import Image from 'core/tools/Image'
import Number from 'core/tools/Number';

// GLOBAL COMPONENTS
import Page from 'parts/page/Page';
import Record from 'parts/record/Record';

// STYLES
import styles from './success.module.scss';

// MAIN COMPONENT
export default compose(
  connect(
    ({ record }) => ({ record })
  )
)(({
  // REDUX STATE
  record: {
    vehicle_info = {}
  }
}) => (<>
  <Page.Card
    title="Success"
  >
    <Page.Module className={styles.module}>
      <Image
        className="mx-auto"
        href={graphics}
        use="success"
        width="113"
        fill="primary"
      />
      <p className={styles.message}>
        Stock # <span className="text-primary font-weight-bolder">{vehicle_info.stock_no}</span>&nbsp;
        <span className="font-weight-bolder">
          {vehicle_info.year}&nbsp;{vehicle_info.make}&nbsp;{vehicle_info.model}, {vehicle_info.exterior_color},&nbsp;
          <Number
            value={vehicle_info.mileage}
            schema="miles"
          />&nbsp;Miles
        </span><br />
        has been successfully added and pricing strategy implemented.
      </p>
      <p className="text-secondary">{'2/1/2021 @ 4:00 PM'} by {'John Doe'}</p>
    </Page.Module>
  </Page.Card>
  <Record.Form.Footer>
    <Button
      label="Add Another Vehicle"
      icon="plus"
      to={makePath(PATHNAMES.addVehicle)}
    />
  </Record.Form.Footer>
</>))
