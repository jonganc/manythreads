// common blog layout wrapper

import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import classNames from 'classnames';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    blogRoot: theme.mixins.gutters({
      paddingTop: 80,
      flex: '1 1 100%',
      maxWidth: '100%',
      margin: '0 auto',
    }),
    [theme.breakpoints.up('md')]: {
      blogRoot: {
        maxWidth: theme.breakpoints.values.md,
      },
    },
  });

const BlogContent: React.SFC<
  WithStyles<ReturnType<typeof styles>> & { className?: string }
> = props => {
  require('prismjs/themes/prism-tomorrow.css');
  const { className, classes, children } = props;

  return (
    <div className={classNames(classes.blogRoot, className)}>
      {children}
    </div>
  );
};

export default withStyles(styles)(BlogContent);
