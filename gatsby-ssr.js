import React from 'react';
import { renderToString } from 'react-dom/server';
import { JssProvider } from 'react-jss';

// eslint-disable-next-line import/no-unresolved
import getPageContext from './src/common/getMuiContext';

import wrapWithProvider from './wrapWithProvider';

// redux: from https://github.com/gatsbyjs/gatsby/blob/master/examples/using-redux/gatsby-ssr.js
export const wrapRootElement = wrapWithProvider;

// material UI: from https://github.com/mui-org/material-ui/tree/master/examples/gatsby
export const replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  // Get the context of the page to collected side effects.
  const pageContext = getPageContext();

  const bodyHtml = renderToString(
    <JssProvider
      registry={pageContext.sheetsRegistry}
      generateClassName={pageContext.generateClassName}
    >
      {React.cloneElement(bodyComponent, {
        pageContext,
      })}
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
        __html: pageContext.sheetsRegistry.toString(),
      }}
    />,
  ]);
};
