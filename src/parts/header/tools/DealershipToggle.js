import React, { forwardRef, useContext, useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { connect } from 'react-redux';
import { compose } from 'redux';

// CONTEXT
import { DealershipContext } from '../helpers/dealershipContext';
import { CollapseContext } from 'core/tools/collapse/helpers/collapseContext';
import { DropdownContext } from 'core/tools/dropdown/helpers/dropdownContext';

// LOCAL COMPONENTS
import HeaderButton from '../parts/HeaderButton';

// STYLES
import styles from './dealershipToggle.module.scss';
import spriteStyles from 'core/tools/sprite.module.scss';

// MAIN COMPONENT
const DealershipToggle = compose(
  connect(
    ({
      dealership,
      user
    }) => ({
      dealership,
      user
    }),
    null,
    null,
    { forwardRef: true }
  )
)(({
  icon,
  onClick,
  forwardedRef,
  // REDUX STATE
  dealership,
  user = {}
}) => {

  // CONTEXT
  const { fetching } = useContext(DealershipContext);
  const { open } = useContext(CollapseContext) || {};
  const { show } = useContext(DropdownContext) || {};

  // MEMOS
  const { stores = [] } = useMemo(
    () => user,
    [user]
  );
  const dealershipName = useMemo(
    () => {
      const store = stores.find(({ dealership_store_id }) => dealership_store_id === dealership) || {};
      return store.store_name
    },
    [stores, dealership]
  )

  // RENDER
  return (
    <HeaderButton
      className={clsx(
        styles.toggle,
        (open || show) && styles.active
      )}
      label={(<>
        <span className={styles.prefix}>Dealership:</span>
        <span className={styles.name}>{dealershipName}</span>
      </>)}
      sprite={{
        as: fetching ? false : undefined,
        use: fetching ? 'loader' : icon,
        className: fetching ? spriteStyles.spin : undefined
      }}
      onClick={onClick}
      ref={forwardedRef}
    />
  )
})

export default forwardRef((props, ref) => <DealershipToggle {...props} forwardedRef={ref} />)
