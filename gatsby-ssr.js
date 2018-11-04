import { SheetsRegistry } from 'jss';
import React from 'react';
import { JssProvider } from 'react-jss';

/* eslint-disable import/no-unresolved */
import Layout from './src/components/_all/Layout';
import MuiRoot from './src/components/_all/MuiRoot';
import ReduxProvider from './src/components/_all/ReduxProvider';
/* eslint-enable import/no-unresolved */

// making this global is a bit hacky but I don't know that there's another way to do it
let sheetsRegistry;

export const wrapPageElement = ({ element }) => (
  <Layout>{element}</Layout>
);

export const wrapRootElement = ({ element }) => {
  sheetsRegistry = new SheetsRegistry();
  const sheetsManager = new Map();

  return (
    <JssProvider registry={sheetsRegistry}>
      <MuiRoot sheetsManager={sheetsManager}>
        <ReduxProvider>{element}</ReduxProvider>
      </MuiRoot>
    </JssProvider>
  );
};

export const onRenderBody = ({ setHeadComponents }) => {
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
