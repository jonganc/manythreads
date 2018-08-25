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
import { SvgIconProps } from '@material-ui/core/SvgIcon';
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
const footerIngredientsAColor = Color(colors.primary[1], 'rgb')
  .opaquer(3.0)
  .string();

const styles = (theme: Theme) => {
  const spacing = theme.spacing.unit;
  return createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    mainContent: { flex: '1 0 auto' },
    footerWrapper: {
      flexShrink: 0,
      marginTop: spacing * 3,
      backgroundColor: footerColor,
      color: 'white',
    },
    footerContent: theme.mixins.gutters({
      paddingTop: spacing * 4,
      paddingBottom: spacing * 3,

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
};

const ingredientsLinkStyle = createStyles({
  root: {
    color: footerIngredientsAColor /* colors.primary[1]*/,
    '&:hover': {
      color: colors.primary[2],
    },
  },
});

const IngredientsAInner: SFC<
  Overwrite<
    JSX.IntrinsicElements['a'],
    WithStyles<typeof ingredientsLinkStyle>
  >
> = props => (
  <InvisibleA
    {...props}
    allowProperty="color"
    className={props.classes.root}
  />
);

const IngredientsA = withStyles(ingredientsLinkStyle)(
  IngredientsAInner,
);

const iconStyles = createStyles({ root: {} });

const IconInner: SFC<
  Overwrite<SvgIconProps, WithStyles<typeof iconStyles>>
> = props => ;

const FooterTypography: SFC<
  Omit<TypographyProps, 'color'>
> = props => <Typography {...props} color="inherit" />;

const WithFooter: SFC<WithStyles<typeof styles>> = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.mainContent}>{props.children}</div>
      <div className={classes.footerWrapper}>
        <Grid container className={classes.footerContent}>
          <Grid item xs={12} sm={6}>
            <FooterTypography>
              Made with{' '}
              <IngredientsA href="https://www.gatsbyjs.org/">
                Gatsby
              </IngredientsA>
              {' + '}
              <IngredientsA href="https://www.typescriptlang.org/">
                TypeScript
              </IngredientsA>
              {' + '}
              <IngredientsA href="https://material-ui.com/">
                MaterialUI
              </IngredientsA>
              {' . '}
              <IngredientsA href="https://github.com/jonganc/manythreads">
                View page source
              </IngredientsA>
            </FooterTypography>
          </Grid>
          <Grid item xs={12} sm={6} />
        </Grid>
      </div>
    </div>
  );
};

export default withStyles(styles)(WithFooter);
