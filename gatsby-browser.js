import React from 'react';

// from https://github.com/gatsbyjs/gatsby/blob/master/examples/using-redux/gatsby-browser.js
// import wrapWithProvider from './wrapWithProvider';

// export const wrapRootElement = wrapWithProvider;

/* eslint-disable import/no-unresolved */
import MuiRoot from './src/components/_all/MuiRoot';
/* eslint-enable import/no-unresolved */

export const wrapRootElement = ({ element }) => (
  <MuiRoot>{element}</MuiRoot>
);
