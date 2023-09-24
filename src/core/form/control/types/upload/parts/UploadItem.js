import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// CORE COMPONENTS
import Sprite from 'core/tools/Sprite';

// LOCAL COMPONENTS
import DeleteButton from './DeleteButton';

// STYLES
import styles from './uploadItem.module.scss';

// MAIN COMPONENT
const UploadItem = props => {

  // PROPS
  const {
    name,
    success,
    error
  } = props

  // RENDER
  return (
    <div className={clsx(
      styles.item,
      error && styles.error
    )}>
      <span className={styles.label}>{name}</span>
      {success || error ? (
        <DeleteButton {...props} />
      ) : (
        <Sprite.Loader />
      )}
    </div>
  )
}

export default UploadItem;
