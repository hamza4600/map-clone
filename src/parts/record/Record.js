import React from 'react';

// DEPENDENCIES
import { compose } from 'redux';

// CONTEXT
import { recordContext } from 'helpers/recordContext.js';

// GLOBAL COMPONENTS
import Page from 'parts/page/Page';

// LOCAL COMPONENTS
import RecordCard from './parts/RecordCard';
import RecordFooter from './parts/RecordFooter';
import RecordForm from './parts/RecordForm';
import RecordButton from './tools/button/RecordButton';

// MAIN COMPONENT
const Record = compose(
  recordContext
)(({
  children,
  ...props
}) => (
  <Page {...props}>
    {children}
  </Page>
))

// CHILD COMPONENTS
Record.Body   = Page.Body;
Record.Card   = RecordCard;
Record.Form   = RecordForm;
Record.Button = RecordButton;
Record.Footer = RecordFooter;

export default Record
