import {
  createStyles,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import { graphql } from 'gatsby';
import { get } from 'lodash';
import React from 'react';
import Helmet from 'react-helmet';

import { MarkdownRemark, Site } from '../common/graphql-types';
import { PageProps } from '../common/types';
import InvisibleLink from '../components/_common/InvisibleLink';
import Bio from '../components/blog/_all/Bio';
import BlogContent from '../components/blog/_all/BlogContent';
import Navigation from '../components/blog/_nonindex/Navigation';

const styles = (theme: Theme) => {
  const spacing = theme.spacing.unit;
  return createStyles({
    root: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    topLinkToIndex: {
      display: 'inline-flex',
      alignItems: 'center',
      '& .leftChevron': {
        fontSize: 'xx-large',
        marginRight: spacing,
        paddingBottom: '4%',
      },
      '& .text': {},
    },
    post: {
      marginBottom: spacing * 2,
    },
    postTitle: {},
    date: {},
  });
};

// produced in createPage in gatsby-node.js
export interface BlogContext {
  slug: string;
  previous: MarkdownRemark | null;
  next: MarkdownRemark | null;
}

interface BlogPostData {
  markdownRemark: MarkdownRemark;
  site: Site;
}

interface BlogPostProps extends PageProps, WithStyles<typeof styles> {
  data: BlogPostData;
  pageContext: BlogContext;
}

class BlogPost extends React.Component<BlogPostProps> {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const { previous, next } = this.props.pageContext;

    if (post.frontmatter == undefined) {
      throw new Error('Postmatter undefined');
    }

    const { classes } = this.props;

    return (
      <BlogContent>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />{' '}
        <div className={classes.root}>
          <Typography variant="title" gutterBottom>
            <InvisibleLink
              to={'/'}
              className={classes.topLinkToIndex}
            >
              <div className="leftChevron">&lsaquo;</div>
              <div className="text">To Index</div>
            </InvisibleLink>
          </Typography>
          <Typography variant="display2" gutterBottom>
            {post.frontmatter.title}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {post.frontmatter.date}
          </Typography>
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: post.html! }}
            gutterBottom
          />
          <hr />
          <Bio />

          <Navigation next={next} previous={previous} />
        </div>
      </BlogContent>
    );
  }
}

export default withStyles(styles)(BlogPost);

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
