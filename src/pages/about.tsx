import { graphql } from 'gatsby';
import React from 'react';

import { PageProps } from '../common/types';
import AboutMain, {
  AboutProps,
} from '../components/general/about/About';

const About: React.SFC<PageProps & AboutProps> = props => (
  <AboutMain {...props} />
);

export default About;

export const pageQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
        author
      }
    }
  }
`;
