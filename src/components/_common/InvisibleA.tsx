import { Overwrite } from '@material-ui/core';
import {
  createStyles,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import classnames from 'classnames';
import l_ from 'lodash';
import React from 'react';

import { properties } from './_common/linkCommon';

type AllowProperty = keyof (typeof properties);

// tslint:disable-next-line:interface-over-type-literal
type Styles = {
  root: { [key in AllowProperty]: any };
};

const InvisibleAInner: React.SFC<
  Overwrite<JSX.IntrinsicElements['a'], WithStyles<Styles>>
> = props => {
  const { classes, className, ...rest } = props;
  return (
    <a
      className={classnames(classes.root, className)}
      // I think the type of Link is out of date. Hence, the type casting
      {...rest}
    />
  );
};

const InvisibleA: React.SFC<
  JSX.IntrinsicElements['a'] & {
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

  const InvisibleAInnerClass = withStyles(styles)(InvisibleAInner);

  return <InvisibleAInnerClass {...rest} />;
};

export default InvisibleA;
