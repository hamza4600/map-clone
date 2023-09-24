import React, { useMemo } from 'react';

// DEPENDENCIES
import { find } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { USER_ROLES } from 'globals.js';

// GLOBAL COMPONENTS
import Page from 'parts/page/Page';

// STYLES
import styles from './header.module.scss';

// MAIN COMPONENT
export default compose(
  connect(
    ({ user }) => ({ user })
  )
)(({
  user
}) => {

  const role = useMemo(
    () => find(USER_ROLES, o => o.key === user.role_key),
    [user]
  )

  return (
    <Page.Header className={styles.header}>
      <Page.Header.Title>
        {user.first_name} {user.last_name}
      </Page.Header.Title>
      <span className={styles.jobTitle}>{role.name}</span>
      <div className={styles.contactInfo}>
        {!!user.email_address &&
          <>
            <Page.Header.Divider />
            <Page.Header.Sprite use="mail" />
            {user.email_address}
          </>
        }
        {!!user.cell_phone &&
          <>
            <Page.Header.Divider />
            <Page.Header.Sprite use="phone" useStroke />
            {user.cell_phone}
          </>
        }
      </div>
    </Page.Header>
  )
})
