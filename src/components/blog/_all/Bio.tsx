import { Typography } from '@material-ui/core';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import * as React from 'react';

// tslint:disable-next-line:no-var-requires
const profilePic = require('../../_common/manythreads-jonathan_ganc-bio-small.jpg');

const styles = (theme: Theme) => {
  const spacing = theme.spacing.unit;
  return createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: spacing * 2,
    },
    profilePic: {
      borderRadius: '50%',
      maxHeight: spacing * 12,
      marginLeft: spacing * 2,
      marginRight: spacing * 4,
    },
  });
};

class Bio extends React.Component<WithStyles<typeof styles>> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <img
          src={profilePic}
          alt={`Jonathan Ganc`}
          className={classes.profilePic}
        />
        <Typography variant="subheading">
          A blog about web development, with a back end focus, from
          the mind of <strong>Jonathan Ganc</strong>,<br /> a web
          developer living in Boston, MA
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Bio);
