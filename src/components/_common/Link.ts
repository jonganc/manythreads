/**
 * This file is just a wrapper around gatsby-link because it has messed up properties
 */

// adapted from module gatsby-link

import {
  GatsbyLinkProps as GatsbyLinkPropsOrig,
  Link as LinkOrig,
} from 'gatsby';
import React, { Ref } from 'react';

import { Omit } from '../../common/types';

export interface GatsbyLinkProps<TState = {}>
  extends Omit<GatsbyLinkPropsOrig<TState>, 'ref' | 'innerRef'> {
  innerRef?: Ref<HTMLAnchorElement>;
  // not 100% sure about this but... I think it's right...?
  ref?: Ref<GatsbyLinkClass<TState>>;
}

// this should really just be `declare class GatsbyLinkClass...` but otherwise gatsby has issues
class GatsbyLinkClass<TState = {}> extends React.Component<
  GatsbyLinkProps<TState>,
  any
> {}

const GatsbyLink: typeof GatsbyLinkClass = LinkOrig as any;

export default GatsbyLink;
