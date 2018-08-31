import React from 'react';

/* eslint-disable import/no-unresolved */
import Layout from './src/components/_all/Layout';
import MuiRoot from './src/components/_all/MuiRoot';
import ReduxProvider from './src/components/_all/ReduxProvider';
/* eslint-enable import/no-unresolved */

export const wrapPageElement = ({ element }) => (
  <Layout>{element}</Layout>
);

export const wrapRootElement = ({ element }) => (
  <MuiRoot>
    <ReduxProvider>{element}</ReduxProvider>
  </MuiRoot>
);
