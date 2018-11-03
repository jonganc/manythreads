import { createGenerateClassName } from '@material-ui/core/styles';
import { SheetsRegistry } from 'jss';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { JssProvider } from 'react-jss';

/* eslint-disable import/no-unresolved */
// import ReduxProvider from './src/components/_all/ReduxProvider';
/* eslint-enable import/no-unresolved */

// export const wrapRootElement = ({ element }) => (
//   <ReduxProvider>{element}</ReduxProvider>
// );

// material UI: adapted from https://github.com/mui-org/material-ui/tree/master/examples/gatsby

export const replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  const sheetsRegistry = new SheetsRegistry();

  const bodyHtml = renderToString(
    <JssProvider
      registry={sheetsRegistry}
      generateClassName={createGenerateClassName()}
    >
      {bodyComponent}
    </JssProvider>,
  );

  replaceBodyHTMLString(bodyHtml);

  setHeadComponents([
    <style
      type="text/css"
      id="jss-server-side"
      key="jss-server-side"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: sheetsRegistry.toString(),
      }}
    />,
  ]);
};
