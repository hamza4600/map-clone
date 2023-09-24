import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// LOCAL COMPONENTS
import Adjustment from './Adjustment';

// LOCAL COMPONENTS
import Info from './Info';

// STYLES
import styles from './amountPercentAdjustment.module.scss';
import info from './info.module.scss';

// MAIN COMPONENT
export default ({
  variant,
  values = {},
  labels = {},
  adjustment = true,
  deduction,
  title,
  type = !adjustment ? '' : deduction ? 'Deduction' : 'Adjustment',
  parent = 'IMV',
  // REST
  ...props
}) => (
  <>
    <div className={clsx(
      styles.container,
      info.border
    )}>
      <Info
        value={values.amount}
        label={labels.amount || `${title} ${type} Amount`}
        schema="dollars"
      />
      {!!adjustment &&
        <Adjustment
          className={styles.adjustment}
          values={values}
          label={labels.adjustment || `${title} ${type || 'Adjustment'}`}
          deduction={deduction}
        />
      }
    </div>
    <Info
      value={values.percent}
      label={labels.percent|| `${title} ${type} % of ${parent}`}
      schema="percent"
    />
  </>
)
