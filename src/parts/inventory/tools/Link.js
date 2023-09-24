import React from 'react';

// FUNCTIONS
import { makePath } from 'functions.js';

// GLOBAL VARIABLES
import { PATHNAMES } from 'pathnames.js';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './link.module.scss';

// CHILD COMPONENT
const Link = ({
  label,
  icon,
  path,
  vehicle_id: recordID,
  // REST
}) => (
  <Button.Link
    className={styles.link}
    variant="link"
    label={label}
    icon={icon}
    to={makePath(path, recordID)}
  />
)

// MAIN EXPORT
export default {
  AddIMV: props => (
    <Link
      label="Add Entry"
      icon="plus"
      path={PATHNAMES.addIMV}
      {...props}
    />
  ),
  View: props => (
    <Link
      label="View"
      path={PATHNAMES.viewVehicle}
      {...props}
    />
  )
}
