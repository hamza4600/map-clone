import React from 'react';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// GLOBAL COMPONENTS
import Page from 'parts/page/Page';
import Record from 'parts/record/Record';

// LOCAL COMPONENTS
import Header from './parts/Header';

// MAIN COMPONENT
const Vehicle = ({
  children,
  ...props
}) => (
  <Record
    endpoint={ENDPOINTS.vehicle.get}
    idKey="vehicle_id"
    {...props}
  >
    <Header />
    <Page.Body>{children}</Page.Body>
  </Record>
)

Vehicle.Form = ({
  args = {},
  ...props
}) => (
  <Record.Form
    args={{
      method: 'POST',
      ...args
    }}
    {...props}
  />
)
Vehicle.Footer = ({
  children,
  next,
  back,
  save,
  cancel
}) => (
  <Record.Form.Footer>
    {children || <>
      {!!back ? (
        <Record.Button.Back to={back} />
      ) : (
        <Record.Button.Cancel to={cancel} />
      )}
      {!!next ? (
        <Record.Button.Next to={next} />
      ) : (
        <Record.Button.Save to={save} />
      )}
    </>}
  </Record.Form.Footer>
);
Vehicle.Button = Record.Button;

export default Vehicle
