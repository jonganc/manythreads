/* https://github.com/mui-org/material-ui/tree/master/examples/gatsby */

/* This adds the appropriate context for material-ui */

import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider, {
  MuiThemeProviderProps,
} from '@material-ui/core/styles/MuiThemeProvider';
import React from 'react';

import muiTheme from '../../common/muiTheme';

export type SheetsManager = NonNullable<
  MuiThemeProviderProps['sheetsManager']
>;

interface MuiRootProps {
  sheetsManager: SheetsManager;
}

export default class MuiRoot extends React.Component<MuiRootProps> {
  public constructor(props: MuiRootProps) {
    super(props);
  }

  render() {
    // MuiThemeProvider makes the theme available down the React tree thanks to React context.
    return (
      <MuiThemeProvider theme={muiTheme}>
        {/* CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}
