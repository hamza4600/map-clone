import React, { useCallback, useEffect, useState } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { connect } from 'react-redux'
import { compose } from 'redux';

// GLOBAL COMPONENTS
import Scrollbox from 'core/tools/Scrollbox';

// LOCAL COMPONENTS
import Menu from '../Menu';

// STYLES
import styles from './vehicleNav.module.scss';

// CHILD COMPONENTS
const Item = compose(
  connect(
    ({ mobile }) => ({ mobile })
  )
)(({
  activeKey,
  itemKey,
  label,
  // REDUX STATE
  mobile
}) => {

  // CALLBACKS
  const handleClick = useCallback(
    () => {
      const itemCard = document.getElementById(itemKey);
      if (!itemCard) return;
      const main = document.getElementsByTagName("MAIN")[0];
      window.scrollTo({
        top: mobile ? itemCard.offsetTop + main.offsetTop - 65 : itemCard.offsetTop - 85,
        behavior: 'smooth'
      });
    },
    [itemKey, mobile]
  )

  // RENDER
  return (
    <Menu.Item
      as="a"
      className={styles.item}
      linkClassName={clsx(
        styles.link,
        activeKey === itemKey && 'active'
      )}
      onClick={handleClick}
    >
      <Menu.Label className={styles.label}>{label}</Menu.Label>
    </Menu.Item>
  )
})

// MAIN COMPONENT
const VehicleNav = compose(
  connect(
    ({ mobile }) => ({ mobile })
  )
)(({
  mobile
}) => {

  // STATE
  const [ activeKey, setActiveKey ] = useState('vehicleDetails');

  // CALLBACKS
  const checkActiveKey = useCallback(
    () => {

      let activeKey;

      Array.prototype.slice.call(document.getElementsByClassName('card')).forEach(card => {
        if (card.id && card.offsetTop < window.scrollY + window.innerHeight) activeKey = card.id;
      })
      if (activeKey) setActiveKey(activeKey);
    },
    [setActiveKey]
  )

  // EFFECTS
  useEffect(
    () => {
      window.addEventListener('scroll', checkActiveKey);
      window.addEventListener('resize', checkActiveKey);

      return () => {
        window.removeEventListener('scroll', checkActiveKey);
        window.removeEventListener('resize', checkActiveKey);
      }
    },
    [checkActiveKey]
  )

  // RENDER
  return (
    <Scrollbox
      direction="horizontal"
      disabled={!mobile}
    >
      <Menu.Nav className={styles.nav}>
        <Item
          activeKey={activeKey}
          itemKey='vehicleDetails'
          label={<>Vehicle <br className="d-lg-none" />Details</>}
        />
        <Item
          activeKey={activeKey}
          itemKey='initialIMVPricing'
          label={<>Initial Pricing <br />Strategy <Menu.Hidden>& IMV</Menu.Hidden></>}
        />
        <Item
          activeKey={activeKey}
          itemKey='currentIMVPricing'
          label={<>Current Pricing <br />Strategy <Menu.Hidden>& IMV</Menu.Hidden></>}
        />
        <Item
          activeKey={activeKey}
          itemKey='imvPricingHistory'
          label={<>IMV Pricing <br />History</>}
        />
        <Item
          activeKey={activeKey}
          itemKey='soldInfo'
          label="Sold Info"
        />
      </Menu.Nav>
    </Scrollbox>
  )
})

// EXPORT
export default VehicleNav;
