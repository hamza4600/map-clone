import React, { useCallback, useMemo, useState } from 'react';

// DEPENDENCIES
import { map, mapValues } from 'lodash';
import { connect } from 'react-redux';

// FUNCTIONS
import { preferencesActions } from 'actions.js';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import FilterSearch from './FilterSearch';
import FilterCollapse from '../parts/FilterCollapse';

// MAIN COMPONENT
export default connect(
  ({
    preferences: {
      inventorySettings
    } }) => ({
      inventorySettings
    }),
  ({ ...preferencesActions })
)(({
  inventorySettings,
  update
}) => {

  // SEARCH STATE
  const [ search, setSearch ] = useState();

  // INITIALIZE VALUES
  const initialValues = useMemo(
    () => ({
      ...mapValues(inventorySettings, group => ([
        ...Object.keys(group.columns).filter(column => group.columns[column].show)
      ]))
    }),
    [inventorySettings]
  )

  // SUBMIT HANDLER
  const handleSubmit = useCallback(
    params => {
      update('inventorySettings', {
        ...mapValues(inventorySettings, (group, groupKey) => ({
          ...group,
          columns: mapValues(group.columns, (column, columnKey) => ({
            ...column,
            show: params[groupKey].includes(columnKey)
          })),
          show: params[groupKey].length > 0
        }))
      })
    },
    [inventorySettings, update]
  )

  // RENDER
  return (
    <>
      <FilterSearch
        onChange={setSearch}
      />
      <Form
        id="filter-groups"
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {map(inventorySettings, (group, groupKey) => (
          <FilterCollapse
            key={groupKey}
            group={group}
            groupKey={groupKey}
            search={search}
          />
        ))}
      </Form>
    </>
  )
})
