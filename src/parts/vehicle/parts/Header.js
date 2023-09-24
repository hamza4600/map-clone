import React, { useMemo } from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { compose } from 'redux';

// CORE COMPONENTS
import Number from 'core/tools/Number';

// GLOBAL COMPONENTS
import Page from 'parts/page/Page';

// MAIN COMPONENT
export default compose(
  connect(
    ({
      user,
      dealership,
      record,
    }) => ({
      dealership,
      user,
      record
    })
  )
)(({
  user: {
    stores = []
  },
  dealership,
  record: {
    vehicle_info
  }
}) => {

  // MEMO
  const store = useMemo(
    () => stores.filter(({
      dealership_store_id,
      store_name
    }) => dealership_store_id === dealership)[0] || {},
    [stores, dealership]
  )

  return !vehicle_info ? null : (
    <Page.Header>
      <Page.Header.Title>{store.store_name}</Page.Header.Title>
      <Page.Header.Divider />
      <span>
        <Page.Header.Label>Stock #</Page.Header.Label>
        <span className="text-primary">{vehicle_info.stock_no}</span>
      </span>
      <Page.Header.Break />
      <Page.Header.Divider />
      <span>
        <Page.Header.Sprite
          use="clock"
        />
        <Number
          value={vehicle_info.age}
          schema="days"
        />
      </span>
      <Page.Header.Divider />
      {vehicle_info.year}&nbsp;{vehicle_info.make}&nbsp;{vehicle_info.model}
      <Page.Header.Divider />
      <span>
        <Number
          value={vehicle_info.mileage}
          schema="miles"
        />
        &nbsp;miles
      </span>
    </Page.Header>
  )
})
