import { SheetsRegistry } from 'jss';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { JssProvider } from 'react-jss';

/* eslint-disable import/no-unresolved */
import Layout from './src/components/_all/Layout';
import MuiRoot from './src/components/_all/MuiRoot';
import ReduxProvider from './src/components/_all/ReduxProvider';
/* eslint-enable import/no-unresolved */

export const wrapPageElement = ({ element }) => (
  <Layout>{element}</Layout>
);

export const wrapRootElement = ({ element }) => (
  <ReduxProvider>{element}</ReduxProvider>
);

// material UI: adapted from https://github.com/mui-org/material-ui/tree/master/examples/gatsby

export const replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  const sheetsRegistry = new SheetsRegistry();
  const sheetsManager = new Map();

  const bodyHtml = renderToString(
    <JssProvider registry={sheetsRegistry}>
      <MuiRoot sheetsManager={sheetsManager}>{bodyComponent}</MuiRoot>
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
