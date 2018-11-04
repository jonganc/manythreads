import { createGenerateClassName } from '@material-ui/core/styles';
import React from 'react';
import { JssProvider } from 'react-jss';

/* eslint-disable import/no-unresolved */
import Layout from './src/components/_all/Layout';
import MuiRoot from './src/components/_all/MuiRoot';
import ReduxProvider from './src/components/_all/ReduxProvider';
/* eslint-enable import/no-unresolved */

// gatsby-plugin-jss/src/gatsby-browser.js
export const onInitialClientRender = () => {
  const ssStyles = window.document.getElementById(`jss-server-side`);
  if (ssStyles) {
    ssStyles.parentNode.removeChild(ssStyles);
  }
};

export const wrapPageElement = ({ element }) => (
  <Layout>{element}</Layout>
);

/* eslint-disable no-underscore-dangle */
export const wrapRootElement = ({ element }) => {
  // we use a common sheetsManager for all pages
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = {
      generateClassName: createGenerateClassName(),
      sheetsManager: new Map(),
    };
  }

  return (
    <JssProvider
      generateClassName={
        global.__INIT_MATERIAL_UI__.generateClassName
      }
    >
      <MuiRoot
        sheetsManager={global.__INIT_MATERIAL_UI__.sheetsManager}
      >
        <ReduxProvider>{element}</ReduxProvider>
      </MuiRoot>
    </JssProvider>
  );
};
