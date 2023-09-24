import React, { useCallback } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { COPYRIGHT, VERSION, USER_ROLES } from 'globals.js';

// FUNCTIONS
import { setMenuCollapse } from 'actions.js';
import { getPath } from 'functions.js';

// ROUTER COMPONENTS
import { Link } from 'react-router-dom';

// CORE COMPONENTS
import Button from 'core/tools/Button';
import Image from 'core/tools/Image';
import Scrollbox from 'core/tools/Scrollbox';

// LOCAL COMPONENTS
import MenuBadge from './parts/MenuBadge';
import MenuHidden from './parts/MenuHidden';
import MenuItem from './parts/MenuItem';
import MenuLabel from './parts/MenuLabel';
import MenuNav from './parts/MenuNav';

// NAVS
import AdminNav from './navs/AdminNav';

// STYLES
import styles from './menu.module.scss';

// MAIN COMPONENT
const Menu = compose(
  connect(
    ({ mobile, menu, user }) => ({ mobile, menu, user }),
    { setMenuCollapse }
  )
)(({
  // REDUX STATE
  mobile,
  menu: menuCollapse,
  user,
  // REDUX DISPATCH
  setMenuCollapse,
  // REST
  nav: Nav = user.role_key === USER_ROLES.sysAdmin.key || user.role_key === USER_ROLES.storeAdmin.key ? AdminNav : () => null,
  ...props
}) => {

  // MENU TOGGLES
  const toggleCollapse = useCallback(
    collapse => setMenuCollapse(collapse),
    [setMenuCollapse]
  )

  // RENDER
  return (
    <div
      className={clsx(
        'theme-dark', // Custom Class
        styles.menu,
        mobile ? styles.mobile : styles.desktop
      )}
      data-collapse={mobile ? undefined : menuCollapse}
    >
      {mobile ? (
        <Nav
          className={styles.nav}
          {...props}
        />
      ) : (<>
        <div className={styles.branding}>
          <Link
            to={'/'}
          >
            <Image.Logo
              fill="white"
              className={clsx(
                styles.logo,
                styles.lg
              )}
            />
            <Image.Logo.Small
              fill="white"
              className={clsx(
                styles.logo,
                styles.sm
              )}
            />
          </Link>
        </div>
        <Scrollbox
          outerClassName={styles.scrollboxOuter}
          innerClassName={styles.scrollboxInner}
          trayClassName={styles.scrollboxTray}
          preventDefault
        >
          <div className={styles.body}>
            <Nav
              className={styles.nav}
              {...props}
            />
          </div>
          <div className={styles.footer}>
            <Button.Link
              className={styles.toggleButton}
              variant="custom"
              icon={menuCollapse ? 'chevron-right' : 'chevron-left'}
              onClick={() => toggleCollapse()}
              round={false}
            />
            {user.role_key === USER_ROLES.user.key &&
              <Button
                as={Link}
                className={styles.addButton}
                variant="accent"
                label="Add A Vehicle"
                sprite={{
                  use: 'plus',
                  className: 'mx-auto'
                }}
                to={getPath('vehicle', 'addVehicle')}
                size="lg"
                justify="center"
                square={menuCollapse}
                fullWidth
              />
            }
            <span className={styles.copyright}>
              {COPYRIGHT} v{VERSION} {new Date().getFullYear()}
            </span>
          </div>
        </Scrollbox>
      </>)}
    </div>
  )
})

// CHILD COMPONENTS
Menu.Badge  = MenuBadge;
Menu.Hidden = MenuHidden;
Menu.Item   = MenuItem;
Menu.Label  = MenuLabel;
Menu.Nav    = MenuNav;

// EXPORT
export default Menu;
