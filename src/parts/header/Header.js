import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { PATHNAMES } from 'pathnames.js';

// FUNCTIONS
import { toggleSidebar } from 'actions.js';
import { makePath } from 'functions.js';

// CONTEXT
import { dealershipContext } from './helpers/dealershipContext';
import { searchContext } from './helpers/searchContext';

// ROUTER COMPONENTS
import { Link, Route } from "react-router-dom";

// GLOBAL COMPONENTS
import Image from 'core/tools/Image';

// LOCAL COMPONENTS
import HeaderButton from './parts/HeaderButton';
import HeaderDropdown from './parts/HeaderDropdown';
import DealershipCollapse from './tools/DealershipCollapse';
import DealershipDropdown from './tools/DealershipDropdown';
import MenuDropdown from './tools/MenuDropdown';
import SearchCollapse from './tools/SearchCollapse';
import SearchInline from './tools/SearchInline';
import SearchToggle from './tools/SearchToggle';

// STYLES
import styles from './header.module.scss';

// MAIN COMPONENT
const Header = compose(
  connect(
    ({ mobile }) => ({ mobile }),
    { toggleSidebar }
  ),
  dealershipContext,
  searchContext
)(({
  children,
  className,
  // REDUX STATE
  mobile,
  // REDUX ACTION
  toggleSidebar
}) => (
  <header
    id="site-header"
    className={clsx(
      styles.header,
      className
    )}
  >
    {mobile ? (<>
      <div className={styles.container}>
        <div className={styles.branding}>
          <Link
            to={'/'}
          >
            <Image.Logo fill="white" className={styles.logo} />
          </Link>
        </div>
        <div className={styles.buttons}>
          <Route path={makePath(PATHNAMES.inventory)}>
            <SearchToggle />
            <HeaderButton
              icon="filter"
              square
              onClick={() => toggleSidebar()}
            />
          </Route>
          <MenuDropdown />
        </div>
      </div>
      <div className={styles.subheader}>
        <Route path={makePath(PATHNAMES.inventory)}>
          <SearchCollapse />
        </Route>
        <DealershipCollapse />
      </div>
    </>) : (
      <div className={clsx(
        'position-fixed',
        styles.container
      )}>
        <DealershipDropdown className={styles.addButton} />
        <div className={styles.buttons}>
          <Route path={makePath(PATHNAMES.inventory)}>
            <SearchInline />
          </Route>
          <MenuDropdown />
        </div>
      </div>
    )}
  </header>
))

// CHILD COMPONENTS
Header.Button = HeaderButton;
Header.Dropdown = HeaderDropdown;

// EXPORT
export default Header
