import React from 'react';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// GLOBAL COMPONENTS
import Inventory from 'parts/inventory/Inventory';
import Page from 'parts/page/Page';

// MENU COMPONENTS
import InventoryNav from 'parts/menu/navs/InventoryNav';

// STYLES
import styles from './inventory.module.scss';

// MAIN COMPONENT
export default ({
  ...props
}) => (
  <Page
    {...props}
    className={styles.page}
    documentTitle="Inventory"
    nav={InventoryNav}
  >
    <Inventory
      endpoint={ENDPOINTS.vehicle.list}
    />
  </Page>
)
