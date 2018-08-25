import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import { Grid, List } from '@material-ui/core';
import classnames from 'classnames';
import React from 'react';

interface TwoListColsProps {
  className?: string;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    [theme.breakpoints.down('xs')]: {
      list1: {
        paddingBottom: 0,
      },
      list2: {
        paddingTop: 0,
      },
    },
  });

const TwoListCols: React.SFC<
  WithStyles<typeof styles> & TwoListColsProps
> = props => {
  const { classes, children, className } = props;

  const childrenArr = React.Children.toArray(children);

  return (
    <Grid container className={classnames(classes.root, className)}>
      <Grid item xs={12} sm={6}>
        <List className={classes.list1}>
          {childrenArr
            .slice(0, Math.ceil(childrenArr.length / 2))
            .map(el => el)}
        </List>
      </Grid>
      <Grid item xs={12} sm={6}>
        <List className={classes.list2}>
          {childrenArr
            .slice(Math.ceil(childrenArr.length / 2))
            .map(el => el)}
        </List>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(TwoListCols);
