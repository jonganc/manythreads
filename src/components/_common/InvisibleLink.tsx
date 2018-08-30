import { Overwrite } from '@material-ui/core';
import {
  createStyles,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import classnames from 'classnames';
import l_ from 'lodash';
import React from 'react';

import Link, { GatsbyLinkProps } from '../_common/Link';
import { properties } from './_common/linkCommon';

type AllowProperty = keyof (typeof properties);

// tslint:disable-next-line:interface-over-type-literal
type Styles = {
  root: { [key in AllowProperty]: any };
};

const InvisibleLinkInner: React.SFC<
  Overwrite<GatsbyLinkProps, WithStyles<Styles>>
> = props => {
  const { classes, className, ...rest } = props;
  return (
    <Link
      className={classnames(classes.root, className)}
      // I think the type of Link is out of date. Hence, the type casting
      {...rest}
    />
  );
};

const InvisibleLink: React.SFC<
  GatsbyLinkProps & {
    allowProperty?: AllowProperty | AllowProperty[];
  }
> = props => {
  const { allowProperty, ...rest } = props;

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

  return <InvisibleLinkInnerClass {...rest} />;
};

export default InvisibleLink;
