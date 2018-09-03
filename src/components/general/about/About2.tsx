import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import Typography, {
  TypographyProps,
} from '@material-ui/core/Typography';
import { get } from 'lodash';
import React from 'react';
import Helmet from 'react-helmet';

import { Site } from '../../../common/graphql-types';
import { PageProps } from '../../../common/types';
import Link from '../../_common/Link';
import Contact from './Contact';
import SkillsItem from './SkillsItem';
import TwoListCols from './TwoListCols';

// tslint:disable-next-line:no-var-requires
const profilePic = require('../../_common/manythreads-jonathan_ganc-bio-small.jpg');

const styles = (theme: Theme) => {
  const spacing = theme.spacing.unit;
  return createStyles({
    root: {},
    gutters: theme.mixins.gutters({
      paddingTop: 80,
      flex: '1 1 100%',
      maxWidth: '100%',
      margin: '0 auto',
    }),
    [theme.breakpoints.up('md')]: {
      gutters: {
        maxWidth: theme.breakpoints.values.md,
      },
    },
    section: {
      marginBottom: theme.spacing.unit * 2,
    },
    aboutWrapper: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: spacing * 2,
    },
    profilePic: {
      borderRadius: '50%',
      maxHeight: spacing * 16,
      marginLeft: spacing * 2,
      marginRight: spacing * 4,
    },
    [theme.breakpoints.down('xs')]: {
      aboutWrapper: { flexDirection: 'column' },
      profilePic: {
        marginTop: spacing * 2,
        marginBottom: spacing * 2,
      },
    },
  });
};

export interface AboutProps {
  data: {
    site: Site;
  };
}

const AboutType: React.SFC<TypographyProps> = props => (
  <Typography variant="subheading" gutterBottom {...props}>
    {props.children}
  </Typography>
);

const About: React.SFC<
  WithStyles<typeof styles> & PageProps & AboutProps
> = props => {
  const { classes, theme, data } = props;

  const siteTitle = get(data, 'site.siteMetadata.title');
  return (
    <>
      <Helmet title={`About | ${siteTitle}`} />
      <div className={classes.root}>
        <div className={classes.gutters}>
          <div className={classes.section}>
            <Typography variant="display1" gutterBottom>
              General
            </Typography>
            {function f() {}}
            <Link to="/redux/a">Link here</Link>
            <Link to="/testpage">Link here</Link>
            <div className={classes.aboutWrapper}>
              <img
                src={profilePic}
                alt={`Jonathan Ganc`}
                className={classes.profilePic}
              />
              <div>
                <AboutType>
                  My name is Jonathan Ganc. I got a PhD in physics and
                  spent several years doing research. However, I came
                  to realize that I was simply more passionate about
                  web development and web technologies. The pace and
                  scale of innovation and change in web technology is
                  simply mind-blowing!
                </AboutType>
                <AboutType>
                  I am a Backend and Devops Engineer at{' '}
                  <a href="https://www.coachcare.com">CoachCare</a>
                </AboutType>
              </div>
            </div>
          </div>
          <div className={classes.section}>
            <Typography variant="display1" gutterBottom>
              Skills
            </Typography>
            <AboutType
              style={{ marginBottom: theme!.spacing.unit * 2 }}
            >
              I am a full stack web developer.
            </AboutType>
            <Typography variant="title">Back-end:</Typography>
            <TwoListCols>
              <SkillsItem primary="JavaScript, TypeScript" />
              <SkillsItem primary="Node.js" />
              <SkillsItem primary="Postgresql" />
            </TwoListCols>
            <Typography variant="title">DevOps:</Typography>
            <TwoListCols>
              <SkillsItem primary="Docker / Linux containers" />
              <SkillsItem primary="Kubernetes" />
              <SkillsItem primary="Linux" />
            </TwoListCols>
            <Typography variant="title">Front-end:</Typography>
            <TwoListCols>
              <SkillsItem primary="React" />
              <SkillsItem primary="Redux" />
            </TwoListCols>
          </div>
          <div className={classes.section}>
            <Contact />
          </div>
        </div>
      </div>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(About);
