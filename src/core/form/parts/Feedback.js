import React from 'react';

// BOOTSTRAP COMPONENTS
import FormControl from 'react-bootstrap/FormControl';

// STYLES
import styles from './feedback.module.scss';

// MAIN COMPONENT
const Feedback = ({
  children,
  type = 'invalid',
  feedback = children
}) => !feedback ? null : (
  <div className={styles.wrapper}>
    <FormControl.Feedback className={styles.feedback} type={type}>
      <span>{feedback}</span>
    </FormControl.Feedback>
  </div>
)

// EXPORT
export default Feedback
