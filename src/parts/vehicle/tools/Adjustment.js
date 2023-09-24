import React, { useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL COMPONENTS
import Adjustment from 'tools/Adjustment';
import Number from 'core/tools/Number';

// STYLES
import styles from './adjustment.module.scss';

// MAIN COMPONENT
export default ({
  children,
  className,
  variant,
  values: {
    amount,
    percent
  } = {},
  label,
  deduction,
  // REST
  ...props
}) => {

  // MEMOS
  amount = useMemo(
    () => deduction ? -parseFloat(amount) : parseFloat(amount),
    [amount, deduction]
  )
  variant = useMemo(
    () => variant || (amount < 0 ? 'danger' : amount > 0 ? 'success' : 'primary'),
    [amount, variant]
  )

  // RENDER
  return !amount ? null : (
    <div className={clsx(
      styles.adjustment,
      variant,
      className
    )}>
      <div className={styles.container}>
        <div className="adjustment-label">
          {label &&
            <label className={styles.label}>
              {label}
            </label>
          }
          {children}
        </div>
        <div className="adjustment-values">
          <Adjustment
            className="adjustment-amount"
            value={amount}
            variant={variant}
          />
          &nbsp;/&nbsp;
          <Number
            className="adjustment-percent"
            value={percent}
            schema="percent"
            displayType="text"
          />
        </div>
      </div>
    </div>
  )
}
