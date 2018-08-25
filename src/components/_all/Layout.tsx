// common layout wrapper

import { Overwrite } from '@material-ui/core';
import {
  createStyles,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import classNames from 'classnames';
import React from 'react';

import Footer from './Footer';
import Header from './Header';
import withMuiRoot from './withMuiRoot';

const styles = createStyles({
  root: {
    position: 'relative',
  },
});

const Layout: React.SFC<
  Overwrite<{ className?: string }, WithStyles<typeof styles>>
> = props => (
  <div className={classNames(props.classes.root, props.className)}>
    <Header />
    {props.children}
    <Footer />
  </div>
);

export default withMuiRoot(withStyles(styles)(Layout));
