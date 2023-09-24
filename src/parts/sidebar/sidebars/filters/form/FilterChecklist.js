import React from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';
import { indexOf, startCase } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// MAIN COMPONENT
export default compose(
  connect(
    ({
      preferences: {
        inventorySettings
      }
    }) => ({
      inventorySettings
    })
  )
)(({
  group,
  groupKey,
  columns = [],
  searchedColumns = [],
  inventorySettings
}) => {

  // FORMIK CONTEXT
  const { submitForm } = useFormikContext();

  // RENDER
  return (
    <Form.Body>
      <Form.Checklist
        name={groupKey}
        options={columns.map(columnKey => ({
          value: columnKey,
          label: inventorySettings[groupKey].columns[columnKey].label || startCase(columnKey),
          disabled: indexOf(searchedColumns, columnKey) < 0
        }))}
        onChange={submitForm}
        list={{
          direction: 'vertical'
        }}
      />
    </Form.Body>
  )
})
