import React, { useMemo } from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { compose } from 'redux';

// BOOTSTRAP COMPONENTS
import { ListGroup } from 'react-bootstrap';

// LOCAL COMPONENTS
import DealershipItem from './DealershipItem';

// STYLES
import styles from './dealershipList.module.scss';

// MAIN COMPONENT
const DealershipList = compose(
  connect(
    ({
      dealership,
      user
    }) => ({
      dealership,
      user
    })
  )
)(({
  // HELPER
  onChoose,
  fetching,
  // REDUX STATE
  dealership,
  user
}) => {

  // MEMOS
  const { stores = [] } = useMemo(
    () => user,
    [user]
  );

  // RENDER
  return (
    <ListGroup
      className={styles.list}
    >
      {stores.map(({
        dealership_store_id,
        store_name
      }, i) => (
        <DealershipItem
          key={i}
          dealershipID={dealership_store_id}
          active={dealership_store_id === dealership}
          label={store_name}
        />
      ))}
    </ListGroup>
  )
})

export default DealershipList
