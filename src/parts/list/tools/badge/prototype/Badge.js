import React from 'react';

// DEPENENCIES
import clsx from 'clsx';
import { capitalize } from 'lodash';

// BOOTSTRAP COMOPNENTS
import { Badge as BSBadge } from 'react-bootstrap'

// LOCAL COPONENTS
import Format from '../../format/Format';

// STYLES
import styles from './badge.module.scss';

// MAIN COMPONENT
const Badge = ({
  className,
  children,
  label,
  format,
  Wrapper = Format[capitalize(format)] || Format,
  ...props
}) => !children && !label ? (
  <Format className={className} />
) : (
  <BSBadge
    className={clsx(
      styles.badge,
      className
    )}
    {...props}
  >
    {children || <Wrapper>{label}</Wrapper>}
  </BSBadge>
)

// EXPORT
export default Badge;
