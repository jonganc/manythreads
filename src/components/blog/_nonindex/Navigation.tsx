import {
  createStyles,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import React, { SFC } from 'react';

import { MarkdownRemark } from '../../../common/graphql-types';
import InvisibleLink from '../../_common/InvisibleLink';
import { GatsbyLinkProps } from '../../_common/Link';

const styles = createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    listStyle: 'none',
    padding: 0,
  },
});

const NavigationLink: SFC<GatsbyLinkProps> = props => (
  <Typography variant="subtitle1">
    <InvisibleLink allowProperty="color" {...props} />
  </Typography>
);

interface NavigationProps extends WithStyles<typeof styles> {
  next: MarkdownRemark | null | undefined;
  previous: MarkdownRemark | null | undefined;
}

const Navigation: SFC<NavigationProps> = props => {
  const { classes, next, previous } = props;
  return (
    <div className={classes.root}>
      {previous && (
        <NavigationLink to={previous.fields!.slug!} rel="prev">
          ← {previous.frontmatter!.title}
        </NavigationLink>
      )}

      {next && (
        <NavigationLink to={next.fields!.slug!} rel="next">
          {next.frontmatter!.title} →
        </NavigationLink>
      )}
    </div>
  );
};

export default withStyles(styles)(Navigation);
