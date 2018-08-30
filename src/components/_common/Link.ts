/**
 * This file is just a wrapper around gatsby-link because it has messed up properties
 */

// adapted from module gatsby-link

import { LinkProps } from '@reach/router';
import { Link as LinkOrig } from 'gatsby';
import React, { Ref } from 'react';

import { Omit } from '../../common/types';

export interface GatsbyLinkProps extends Omit<LinkProps<any>, 'ref'> {
  activeClassName?: string;
  activeStyle?: object;
  innerRef?: Ref<HTMLAnchorElement>;
  to: string;
  // not 100% sure about this but... I think it's right...?
  ref?: Ref<GatsbyLinkClass>;
}

declare class GatsbyLinkClass extends React.Component<
  GatsbyLinkProps,
  any
> {}

const GatsbyLink: typeof GatsbyLinkClass = LinkOrig as any;

export default GatsbyLink;
