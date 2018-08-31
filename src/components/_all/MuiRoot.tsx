/* https://github.com/mui-org/material-ui/tree/master/examples/gatsby */

/* This adds the appropriate context for material-ui */

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';

import getMuiContext, {
  MuiContext,
} from '../../common/getMuiContext';

interface MuiContextProps {
  muiContext?: MuiContext;
}

export default class MuiRoot extends React.Component<
  MuiContextProps
> {
  private muiContext: MuiContext;

  public constructor(props: MuiContextProps) {
    super(props);

    console.log('props', props);

    this.muiContext =
      props.muiContext !== undefined
        ? props.muiContext!
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
    console.log('muiContext', this.muiContext);
    // MuiThemeProvider makes the theme available down the React tree thanks to React context.
    return (
      <MuiThemeProvider
        theme={this.muiContext.theme}
        sheetsManager={this.muiContext.sheetsManager}
      >
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}
