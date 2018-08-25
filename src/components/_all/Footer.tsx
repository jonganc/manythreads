import { Overwrite } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography, {
  TypographyProps,
} from '@material-ui/core/Typography';
import * as classNames from 'classnames';
import * as Color from 'color';
import { GatsbyLinkProps } from 'gatsby';
import React, { SFC } from 'react';

import { colors } from '../../common/theme';
import { Omit } from '../../common/types';
import InvisibleA from '../_common/InvisibleA';

/* const footerColor = Color(colors.secondary2[0], 'rgb')
 *   .lighten(1.5)
 *   .string();*/
const footerColor = Color(colors.secondary1[0], 'rgb')
  .fade(0.3)
  .string();
const footerIngredientsLinkColor = Color(colors.primary[1], 'rgb')
  .opaquer(3.0)
  .string();

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginTop: 20,
      backgroundColor: footerColor /* colors.secondary1[4]*/,
      color: 'white',
    },
    footerContent: theme.mixins.gutters({
      paddingTop: 20,
      paddingBottom: 20,
      flex: '1 1 100%',
      maxWidth: '100%',
      margin: '0 auto',
    }),
    [theme.breakpoints.up('md')]: {
      footerContent: {
        maxWidth: theme.breakpoints.values.md,
      },
    },
  });

const ingredientsLinkStyle = createStyles({
  root: {
    color: footerIngredientsLinkColor /* colors.primary[1]*/,
    '&:hover': {
      color: colors.primary[2],
    },
  },
});

const IngredientsLinkInner: SFC<
  WithStyles<typeof ingredientsLinkStyle>
> = props => (
  <InvisibleA
    {...props}
    allowProperty="color"
    className={props.classes.root}
  />
);

const IngredientsLink = withStyles(ingredientsLinkStyle)(
  IngredientsLinkInner,
);

const FooterTypography: SFC<
  Omit<TypographyProps, 'color'>
> = props => <Typography {...props} color="inherit" />;

const Footer: SFC<WithStyles<typeof styles>> = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container className={classes.footerContent}>
        <Grid item xs={6}>
          <FooterTypography>
            Made with{' '}
            <IngredientsLink href="https://www.gatsbyjs.org/">
              Gatsby
            </IngredientsLink>
            {' + '}
            <IngredientsLink href="https://www.typescriptlang.org/">
              TypeScript
            </IngredientsLink>
            {' + '}
            <IngredientsLink href="https://material-ui.com/">
              MaterialUI
            </IngredientsLink>
            {' . '}
            <IngredientsLink href="https://github.com/jonganc/manythreads">
              View page source
            </IngredientsLink>
          </FooterTypography>
        </Grid>
        <Grid item xs={6}>
          <FooterTypography>DEF</FooterTypography>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Footer);
