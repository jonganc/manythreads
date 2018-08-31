import React from 'react';
import { renderToString } from 'react-dom/server';
import { JssProvider } from 'react-jss';

/* eslint-disable import/no-unresolved */
import getMuiContext from './src/common/getMuiContext';
import MuiRoot from './src/components/_all/MuiRoot';
/* eslint-enable import/no-unresolved */

import wrapWithProvider from './wrapWithProvider';

// redux: from https://github.com/gatsbyjs/gatsby/blob/master/examples/using-redux/gatsby-ssr.js
export const wrapRootElement = wrapWithProvider;

// material UI: adapted from https://github.com/mui-org/material-ui/tree/master/examples/gatsby

export const replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  // Get the context of the page to collected side effects.
  const muiContext = getMuiContext();

  const bodyHtml = renderToString(
    <JssProvider
      registry={muiContext.sheetsRegistry}
      generateClassName={muiContext.generateClassName}
    >
      <MuiRoot muiContext={muiContext}>
        {React.cloneElement(bodyComponent, {
          muiContext,
        })}
      </MuiRoot>
    </JssProvider>,
  );

  replaceBodyHTMLString(bodyHtml);

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
