import React from 'react';

import cssClasses from './Layout.module.css';
import Header from '../../components/Navigation/Header/Header';
import Footer from '../../components/Navigation/Footer/Footer';

const Layout = (props) => {
  return (
    <div className={cssClasses.Layout}>
      <Header />
      <main className={cssClasses.Content}>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
