import {
  createStyles,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import { graphql } from 'gatsby';
import { defaultTo } from 'lodash';
import * as React from 'react';
import Helmet from 'react-helmet';
import { VError } from 'verror';

import {
  MarkdownRemarkConnection,
  Site,
} from '../common/graphql-types';
import { PageProps } from '../common/types';
import InvisibleLink from '../components/_common/InvisibleLink';
import Bio from '../components/blog/_all/Bio';
import BlogContent from '../components/blog/_all/BlogContent';

const styles = (theme: Theme) => {
  const spacing = theme.spacing.unit;
  return createStyles({
    root: {},
    post: {
      marginBottom: spacing * 2,
    },
    postTitle: {
      /* boxShadow: 'none'*/
    },
    date: {
      /* fontSize: '95%'*/
    },
  });
};

interface BlogIndexData {
  allMarkdownRemark: MarkdownRemarkConnection;
  site: Site;
}

class BlogIndex extends React.Component<
  WithStyles<typeof styles> & PageProps & { data: BlogIndexData }
> {
  render() {
    const { classes } = this.props;
    const { site, allMarkdownRemark } = this.props.data;

    const siteTitle = site.siteMetadata!.title!;
    const posts = allMarkdownRemark!.edges!.filter((v =>
      v !== null) as <T>(edge: T | null) => edge is T);

    return (
      <BlogContent>
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Helmet title={siteTitle} />
          <Typography variant="h3" gutterBottom>
            Blog
          </Typography>
          <Bio />
          {posts.map(({ node }) => {
            if (
              node == undefined ||
              node.frontmatter == undefined ||
              node.fields == undefined
            ) {
              throw new VError(
                { info: { node } },
                'Undefined node or subfields',
              );
            }
            const slug = defaultTo(node.fields.slug, '');
            const title = node.frontmatter.title || slug;
            return (
              <div key={slug} className={classes.post}>
                <Typography variant="h5">
                  <InvisibleLink
                    className={classes.postTitle}
                    to={slug}
                    allowProperty={'color'}
                  >
                    {title}
                  </InvisibleLink>
                </Typography>
                <Typography variant="tobody2" gutterBottom>
                  <span className={classes.date}>
                    {node.frontmatter.date}
                  </span>
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  dangerouslySetInnerHTML={{
                    __html: defaultTo(node.excerpt, ''),
                  }}
                />
              </div>
            );
          })}
        </div>
      </BlogContent>
    );
  }
}

export default withStyles(styles)(BlogIndex);

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`;
