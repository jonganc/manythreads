import { graphql } from 'gatsby';
import React from 'react';

import { PageProps } from '../common/types';
import Layout from '../components/_all/Layout';
import AboutMain, {
  AboutProps,
} from '../components/general/about/About';

const About: React.SFC<PageProps & AboutProps> = props => (
  console.log(props),
  (
    <Layout>
      <AboutMain {...props} />
    </Layout>
  )
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
