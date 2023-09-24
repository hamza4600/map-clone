import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { connect } from 'react-redux';
import { compose } from 'redux';

// HELPERS
import { documentTitle } from 'helpers/documentTitle';
import { scrollToTop } from 'helpers/scrollToTop';

// GLOBAL COMPONENTS
import Header from 'parts/header/Header';
import Menu from 'parts/menu/Menu';

// LOCAL COMPONENTS
import Body from './parts/Body';
import Card from './parts/Card';
import PageHeader from './parts/Header';
import Index from './parts/Index';
import Module from './parts/Module';

// STYLES
import styles from './page.module.scss';

// MAIN COMPONENT
const Page = compose(
  connect(
    ({ mobile }) => ({ mobile })
  ),
  documentTitle,
  scrollToTop
)(({
  children,
  className,
  nav,
  // REDUX STATE
  mobile
}) => mobile ? (
  <div className={clsx(
    'page-container',
    styles.container,
    className
  )}>
    <Header />
    <div className={clsx(
      'page-body',
      styles.body
    )}>
      <Menu nav={nav} />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  </div>
) : (
  <div className={clsx(
      'page-container',
      styles.container,
      className
    )}>
    <Menu nav={nav} />
    <div className={clsx(
      'page-body',
      styles.body
    )}>
      <Header className="position-fixed" />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  </div>
))

// CHILD COMPONENTS
Page.Header = PageHeader;
Page.Index = Index;
Page.Body = Body;
Page.Card = Card;
Page.Module = Module;

// EXPORT
export default Page;
