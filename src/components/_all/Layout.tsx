// common layout wrapper

import React from 'react';

import Header from './Header';
import WithFooter from './WithFooter';
import withMuiRoot from './withMuiRoot';

const Layout: React.SFC<{ className?: string }> = props => (
  <div className={props.className}>
    <WithFooter>
      <Header />
      {props.children}
    </WithFooter>
  </div>
);

export default withMuiRoot(Layout);
