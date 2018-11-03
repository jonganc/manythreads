import { createGenerateClassName } from '@material-ui/core/styles';
import { GenerateClassName } from 'jss';
import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import MuiRoot, { SheetsManager } from './MuiRoot';

declare global {
  namespace NodeJS {
    interface Process {
      browser: boolean;
    }

    interface Global {
      __MUI_PAGE_CONTEXT__: MuiPageContext;
    }
  }
}

interface MuiPageContext {
  sheetsManager: SheetsManager;
  generateClassName: GenerateClassName;
}

function createPageContext(): MuiPageContext {
  return {
    sheetsManager: new Map(),
    generateClassName: createGenerateClassName(),
  };
}

function getPageContext(): MuiPageContext {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__MUI_PAGE_CONTEXT__) {
    global.__MUI_PAGE_CONTEXT__ = createPageContext();
  }

  return global.__MUI_PAGE_CONTEXT__;
}

export default function withMuiRoot<P>(
  Component: React.ComponentType<P>,
) {
  class WithRoot extends React.Component {
    private pageContext: MuiPageContext;

    constructor(props: P) {
      super(props);
      this.pageContext = getPageContext();
    }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return (
        <JssProvider
          generateClassName={this.pageContext.generateClassName}
        >
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiRoot sheetsManager={this.pageContext.sheetsManager}>
            <Component {...this.props} />
          </MuiRoot>
        </JssProvider>
      );
    }
  }

  return WithRoot;
}
