import { ConsistentWith } from '@material-ui/core';
import {
  createMuiTheme,
  MuiThemeProvider,
  Theme,
  withTheme,
  WithTheme,
} from '@material-ui/core/styles';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import React from 'react';

import getMuiContext from '../../common/getMuiContext';

/**
 * change the material ui theme of a component
 */
function withChangedMuiTheme<P extends ConsistentWith<P, WithTheme>>(
  themeTransformer: (theme: Theme) => ThemeOptions,
) {
  const muiContext = getMuiContext();

  return (Component: React.ComponentType<P>) => {
    const Wrapper: React.SFC<P & WithTheme> = props => (
      <MuiThemeProvider
        theme={createMuiTheme(themeTransformer(props.theme))}
        sheetsManager={muiContext.sheetsManager}
      >
        <Component {...props} />
      </MuiThemeProvider>
    );

    return withTheme()(Wrapper);
  };
}

export default withChangedMuiTheme;
