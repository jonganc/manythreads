import {
  createStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import React from 'react';

import Thimble from './ThimbleSvg';

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    thimble: {
      '& path': {
        fill: theme.palette.primary.main,
      },
    },
  });

interface SkillsItemProps {
  primary: string;
  secondary?: string;
  href?: string;
}

const SkillsItem: React.SFC<
  SkillsItemProps & WithStyles<typeof styles>
> = props => {
  const { classes, primary, secondary, href } = props;
  return (
    <ListItem href={href}>
      <ListItemIcon>
        <Thimble classes={{ root: classes.thimble }} />
      </ListItemIcon>
      <ListItemText
        primary={primary}
        primaryTypographyProps={{ variant: 'subheading' }}
        secondary={secondary}
      />
    </ListItem>
  );
};

export default withStyles(styles)(SkillsItem);
