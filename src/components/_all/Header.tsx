import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { push } from 'gatsby';
import React, { SFC } from 'react';

import InvisibleLink from '../_common/InvisibleLink';

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      backgroundColor: 'white',
      alignItems: 'center',
    },
    toolbar: {
      width: '100%',
      justifyContent: 'space-between',
      maxWidth: theme.breakpoints.values.md,
      marginLeft: 50,
      marginRight: 30,
    },
    logoLink: {
      display: 'inline',
      flexShrink: 1,
    },
    logo: {
      maxWidth: 251,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    aboutLink: { flexShrink: 0 },
  });

// tslint:disable-next-line:no-var-requires
const logo = require('./logo-full-no_tagline.png');

const Header: SFC<WithStyles<typeof styles>> = props => {
  const { classes } = props;

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <InvisibleLink to="/" className={classes.logoLink}>
          <img src={logo} className={classes.logo} />
        </InvisibleLink>
        <Button
          size="large"
          color="primary"
          className={classes.aboutLink}
          onClick={() => push('/about')}
        >
          About
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(Header);
