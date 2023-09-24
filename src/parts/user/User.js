import React from 'react';

// GLOBAL COMPONENTS
import Page from 'parts/record/Record';

// LOCAL COMPONENTS
import Header from './parts/Header';
import Body from './parts/Body';

// MAIN COMPONENT
export default props => (
  <Page
    documentTitle={props.title}
  >
    <Header />
    <Body {...props} />
  </Page>
)
