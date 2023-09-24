import React, { useMemo } from 'react';

// FUNCTIONS
import { inputName, getDates } from 'functions.js';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// GLOBAL VARIABLES
import { DAYS } from 'globals.js';

// STYLES
import styles from './publishFrequency.module.scss';

// MAIN COMPONENT
export default ({
  label = 'Publish Price Frequency'
}) => {

  // MEMOS
  const options = useMemo(
    () => ([
      {
        label: '# of Days',
        value: 'NDY',
        control: {
          name: inputName('number_of_days', 'publish_policy', 'publish_price_frequency'),
          schema: 'days',
          inputGroup: {
            className: styles.group
          }
        }
      },
      {
        label: 'Day(s) of the Week',
        value: 'DAW',
        control: {
          as: Form.Toggle,
          name: inputName('days_of_week', 'publish_policy', 'publish_price_frequency'),
          options: DAYS.map((day, i) => ({ label: day.slice(0, 3), value: i+1 })),
          className: styles.toggle,
          multiple: true,
          size: 'sm',
          inputGroup: {
            className: styles.group
          }
        }
      },
      {
        label: 'Day(s) of the Month',
        value: 'DAM',
        control: {
          as: Form.Toggle,
          name: inputName('days_of_month', 'publish_policy', 'publish_price_frequency'),
          options: getDates(),
          className: styles.toggle,
          multiple: true,
          size: 'sm',
          inputGroup: {
            className: styles.group
          }
        }
      },
      {
        label: 'Custom Date(s)',
        value: 'CTD',
        control: {
          as: Form.Date,
          name: inputName('custom_dates', 'publish_policy', 'publish_price_frequency'),
          inputGroup: {
            className: styles.group
          },
          multiple: true
        }
      }
    ]),
    []
  )

  return (
    <Form.Checklist
      className={styles.checklist}
      type="radio"
      name={inputName('method', 'publish_policy', 'publish_price_frequency')}
      label={{
        className: 'input-label-unstyled',
        label
      }}
      options={options}
      list={{
        direction: 'vertical'
      }}
      inputGroup={{
        className: styles.group
      }}
//      disabled={disabled}
    />
  )
}
