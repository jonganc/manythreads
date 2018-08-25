import { Overwrite } from '@material-ui/core';
import {
  createStyles,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import classnames from 'classnames';
import { GatsbyLinkProps, Link } from 'gatsby';
import l_ from 'lodash';
import React from 'react';

import { Omit } from '../../common/types';
import { properties } from './_common/linkCommon';

type AllowProperty = keyof (typeof properties);

// tslint:disable-next-line:interface-over-type-literal
type Styles = {
  root: { [key in AllowProperty]: any };
};

const InvisibleLinkInner: React.SFC<
  Overwrite<GatsbyLinkProps, WithStyles<Styles>>
> = props => {
  const { classes, className, innerRef, ...rest } = props;
  return (
    <Link
      className={classnames(classes.root, className)}
      // I think the type of Link is out of date. Hence, the type casting
      innerRef={innerRef as any}
      {...rest}
    />
  );
};

const InvisibleLink: React.SFC<
  Omit<GatsbyLinkProps, 'innerRef'> & {
    // not sure if these are all allowed but... what the heck
    innerRef?: React.Ref<any> | React.RefObject<any>;
    allowProperty?: AllowProperty | AllowProperty[];
  }
> = props => {
  const { allowProperty, innerRef, ...rest } = props;

  const allowPropertyArr =
    allowProperty === undefined ? [] : l_.castArray(allowProperty);

  const styles = createStyles({
    root: {
      ...properties,
      ...l_.fromPairs(
        allowPropertyArr.map(prop => [prop, undefined]),
      ),
    },
  }) as Styles;

  const InvisibleLinkInnerClass = withStyles(styles)(
    InvisibleLinkInner,
  );

  return <InvisibleLinkInnerClass innerRef={innerRef} {...rest} />;
};

export default InvisibleLink;
