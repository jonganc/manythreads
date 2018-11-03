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

// we use a common sheetsManager for all pages
const sheetsManager = new Map();
const generateClassName = createGenerateClassName();

export const wrapRootElement = ({ element }) => (
  <JssProvider
    generateClassName={generateClassName}
    key={Math.random()}
  >
    <MuiRoot sheetsManager={sheetsManager}>
      <ReduxProvider>{element}</ReduxProvider>
    </MuiRoot>
  </JssProvider>
);
