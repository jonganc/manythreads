// common layout wrapper

import React from 'react';

import Header from './_common/Header';
import WithFooter from './_common/WithFooter';
import withMuiRoot from './_common/withMuiRoot';

const Layout: React.SFC<{ className?: string }> = props => (
  <div className={props.className}>
    <WithFooter>
      <Header />
      {props.children}
    </WithFooter>
  </div>
);

export default withMuiRoot(Layout);
