/* https://github.com/mui-org/material-ui/tree/master/examples/gatsby */

/* This adds the appropriate context for material-ui */

import { ConsistentWith } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';

import getMuiContext, {
  MuiContext,
} from '../../common/getMuiContext';

interface MuiContextProps {
  muiContext?: MuiContext;
}

function withMuiRoot<P extends ConsistentWith<P, MuiContextProps>>(
  Component: React.ComponentType<P>,
) {
  class WithMuiRoot extends React.Component<P & MuiContextProps> {
    public muiContext: MuiContext;

    public constructor(props: P & MuiContextProps) {
      super(props);

      this.muiContext =
        this.props.muiContext !== undefined
          ? this.props.muiContext!
          : getMuiContext();
    }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#server-side-jss');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      // MuiThemeProvider makes the theme available down the React tree thanks to React context.
      return (
        <MuiThemeProvider
          theme={this.muiContext.theme}
          sheetsManager={this.muiContext.sheetsManager}
        >
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...this.props} />
        </MuiThemeProvider>
      );
    }
  }

  return WithMuiRoot;
}

export default withMuiRoot;
