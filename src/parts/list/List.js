import React, { useContext } from 'react';

// DEPENDENCIES
import { capitalize } from 'lodash';
import { compose } from 'redux';

// HELPERS
import { listContext, ListContext } from './helpers/listContext.js';

// GLOBAL COMPONENTS
import Page from 'parts/page/Page';

// LOCAL COMPONENTS
import Action from './tools/action/Action';
import Button from './tools/button/Button';
import Header from './tools/Header';

// PARTS
import ListCol from './parts/ListCol';
import ListHeaders from './parts/ListHeaders';
import ListRow from './parts/ListRow';

// STYLES
import styles from './list.module.scss';

// MAIN COMPONENT
const List = compose(
  listContext
)(({
  title,
  header = {},
//  tools,
//  sidebars = [],
  // REST
  ...props
}) => {

  // CONTEXT
  const { label, idKey, records } = useContext(ListContext) || {};

  // RENDER
  return (
    <Page
      documentTitle={title}
    >
      <div className={styles.outer}>
        <Header
          title={title}
          {...header}
        />
        <div className={styles.inner}>
          {/*
          <Toolbar
            tools={tools}
          />
          */}
          <ListHeaders />
          {records.total > 0 ? (
            <div className={styles.rows}>
              {records.list.map((record, i) => (
                <ListRow
                  key={i}
                  rowID={i + 1}
                  record={record}
                  recordID={record[idKey]}
                />
              ))}
            </div>
          ) : (
            <div className={styles.message}>No {capitalize(label)}s Found</div>
          )}
          {/*
            <Pagination />
          */}
          {/* sidebars */}
        </div>
      </div>
    </Page>
  )
})

// CHILD COMPONENTS
List.Col     = ListCol;
List.Action  = Action;
List.Button  = Button;
//List.Filter  = Filter;
//List.Toolbar = Toolbar;

// EXPORT
export default List;
