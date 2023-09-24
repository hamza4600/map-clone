import React from 'react';

// FUNCTIONS
import { getPath } from 'functions.js';

// ROUTER COMPONENTS
import { Link } from 'react-router-dom';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Collapse from 'core/tools/collapse/Collapse';

// LOCAL COMPONENTS
import DealershipList from './DealershipList';
import DealershipToggle from './DealershipToggle';

// STYLES
import styles from './dealershipCollapse.module.scss';

// MAIN COMPONENT
const DealershipCollapse = () => (
  <Collapse
    className={styles.collapse}
    toggle={{
      as: props => (
        <div className={styles.tools}>
          <DealershipToggle {...props} />
          <Button
            as={Link}
            className={styles.addButton}
            variant="accent"
            label="Add A Vehicle"
            to={getPath('vehicle', 'addVehicle')}
          />
        </div>
      )
    }}
  >
    <DealershipList />
  </Collapse>
)

export default DealershipCollapse
