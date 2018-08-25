import { LinkProps } from 'reach__router';
/* fix a problem in current version of GatsbyLinkProps */
declare module 'gatsby-link' {
  export interface GatsbyLinkProps {
    className?: LinkProps<{}>['className'];
  }
}
