// common layout wrapper

import React from 'react';

import Footer from './Footer';
import Header from './Header';
import withMuiRoot from './withMuiRoot';

const Layout: React.SFC<{ className?: string }> = props => (
  <div className={props.className}>
    <Header />
    {props.children}
    <Footer />
  </div>
);

export default withMuiRoot(Layout);
