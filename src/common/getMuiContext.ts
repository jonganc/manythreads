/* https://github.com/mui-org/material-ui/tree/master/examples/gatsby */

/* This provides the context needed for setting up Material UI */

import {
  createGenerateClassName,
  createMuiTheme,
} from '@material-ui/core/styles';
import { SheetsRegistry } from 'jss';

import themeOptions from './muiTheme';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme(themeOptions);

function createMuiContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}

export type MuiContext = ReturnType<typeof createMuiContext>;

declare global {
  namespace NodeJS {
    interface Global {
      __INIT_MATERIAL_UI__: MuiContext;
    }
  }
}

// note that this is also used in gatsby-ssr.js
export default function getMuiContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createMuiContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createMuiContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
