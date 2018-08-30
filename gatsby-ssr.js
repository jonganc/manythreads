import React from 'react';
import { JssProvider } from 'react-jss';

/* eslint-disable import/no-unresolved */
import getMuiContext from './src/common/getMuiContext';
import MuiRoot from './src/components/_all/MuiRoot';
/* eslint-enable import/no-unresolved */

// import wrapWithProvider from './wrapWithProvider';

// // redux: from https://github.com/gatsbyjs/gatsby/blob/master/examples/using-redux/gatsby-ssr.js
// export const wrapRootElement = wrapWithProvider;

// material UI: adapted from https://github.com/mui-org/material-ui/tree/master/examples/gatsby

// Get the context of the page to collected side effects.
const muiContext = getMuiContext();

export const wrapRootElement = ({ element }) => (
  <JssProvider
    registry={muiContext.sheetsRegistry}
    generateClassName={muiContext.generateClassName}
  >
    <MuiRoot muiContext={muiContext}>{element}</MuiRoot>
  </JssProvider>
);

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <style
      type="text/css"
      id="server-side-jss"
      key="server-side-jss"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: muiContext.sheetsRegistry.toString(),
      }}
    />,
  ]);
};
