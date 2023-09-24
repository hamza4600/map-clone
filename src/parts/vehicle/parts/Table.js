import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { compose } from 'redux';

// HELPERS
import { fetchTable } from '../helpers/fetchTable';

// BOOTSTRAP COMPONENTS
import { Table } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './table.module.scss';

// MAIN COMPONENT
const Component = compose(
  fetchTable
)(({
  className,
  children,
  bordered,
  boderless,
  hover,
  responsive,
  size,
  striped,
  variant
}) => (
  <Table
    className={clsx(
      styles.table,
      className
    )}
    bordered={bordered}
    boderless={boderless}
    hover={hover}
    responsive={responsive}
    size={size}
    striped={striped}
    variant={variant}
  >
    {children}
  </Table>
))

Component.Header =({
  className,
  children
}) => (
  <thead className={clsx(
    styles.header,
    className
  )}>
    <tr>{children}</tr>
  </thead>
)

Component.Label =({
  className,
  children,
  hide
}) => (
  <th className={clsx(
    styles.label,
    !!hide && styles.hide,
    className
  )}>{children}</th>
)

Component.Body =({
  className,
  children
}) => (
  <tbody className={clsx(
    styles.body,
    className
  )}>{children}</tbody>
)

Component.Row =({
  className,
  children
}) => (
  <tr className={clsx(
    styles.row,
    className
  )}>{children}</tr>
)

Component.Column = ({
  className,
  children,
  hide,
  colspan = ''
}) => (
  <td
    className={clsx(
      styles.column,
      !!hide && styles.hide,
      className
    )}
    colSpan={colspan}
  >{children || <span className="text-muted">N/A</span>}</td>
)

Component.Link = ({
  className,
  children,
  ...props
}) => (
  <Button.Link
    className={clsx(
      styles.link,
      className
    )}
    {...props}
  >{children}</Button.Link>
)

export default Component;
