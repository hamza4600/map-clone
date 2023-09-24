import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL VARIABLES
import { SPRITE } from 'defaults.js';

// MEDIA
import sprite from 'img/sprite.svg';

// LOCAL COMPONENTS
import Image from '../tools/Image';

// STYLES
import styles from './sprite.module.scss';

// MAIN COMPONENT
const Sprite = ({
  as = SPRITE.as,
  className,
  href = sprite,
  use,
  size = SPRITE.size,
  px = styles[`size-${size}`] || styles['size-md'],
  Component = as || Image,
  ...props
}) => !use ? null : (
  <Component
    className={clsx(
      'sprite',
      styles.sprite,
      styles[size],
      className
    )}
    href={href}
    use={use}
    size={size}
    width={px}
    height={px}
    {...props}
  />
)

// CHILD COMPONENTS
Sprite.Success =({
  className,
  ...props
}) => (
  <Sprite
    as={false}
    className={clsx(
      'text-success',
      className
    )}
    use="success"
    {...props}
  />
)
Sprite.Error =({
  className,
  ...props
}) => (
  <Sprite
    as={false}
    className={clsx(
      'text-error',
      className
    )}
    use="error"
    {...props}
  />
)
Sprite.Loader = ({
  className,
  ...props
}) => (
  <Sprite
    {...props}
    as={false}
    className={clsx(
      styles.spin,
      className
    )}
    use="loader"
    {...props}
  />
)

export default Sprite;
