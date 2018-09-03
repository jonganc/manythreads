import React from 'react';

/* eslint-disable import/no-unresolved */
import Layout from './src/components/_all/Layout';
import MuiRoot from './src/components/_all/MuiRoot';
import ReduxProvider from './src/components/_all/ReduxProvider';
/* eslint-enable import/no-unresolved */

// gatsby-plugin-jss/src/gatsby-browser.js
export const onInitialClientRender = () => {
  const ssStyles = window.document.getElementById(`server-side-jss`);
  if (ssStyles) {
    ssStyles.parentNode.removeChild(ssStyles);
  }
};

export const wrapPageElement = ({ element }) => (
  <Layout>{element}</Layout>
);

// we use a common sheetsManager for all pages
const sheetsManager = new Map();

export const wrapRootElement = ({ element }) => (
  <MuiRoot sheetsManager={sheetsManager}>
    <ReduxProvider>{element}</ReduxProvider>
  </MuiRoot>
);
