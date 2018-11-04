import { createGenerateClassName } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { JssProvider } from 'react-jss';

/* eslint-disable import/no-unresolved */
import Layout from './src/components/_all/Layout';
import MuiRoot from './src/components/_all/MuiRoot';
import ReduxProvider from './src/components/_all/ReduxProvider';
/* eslint-enable import/no-unresolved */

const gatsbyRoot = document.getElementById('___gatsby');
let root;

// gatsby-plugin-jss/src/gatsby-browser.js
export const onInitialClientRender = () => {
  // this is an unfortunate hack to account for issues with either Gatsby or Material UI and rendering
  ReactDOM.unmountComponentAtNode(gatsbyRoot);

  const ssStyles = window.document.getElementById(`jss-server-side`);
  if (ssStyles) {
    ssStyles.parentNode.removeChild(ssStyles);
  }

  ReactDOM.hydrate(root, gatsbyRoot);
};

export const wrapPageElement = ({ element }) => (
  <Layout>{element}</Layout>
);

class WrapperWithUpdate extends React.Component {
  constructor(props) {
    super(props);
    global.forceUpdate = this.forceUpdate.bind(this);
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

/* eslint-disable no-underscore-dangle */
export const wrapRootElement = ({ element }) => {
  // we use a common sheetsManager for all pages
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = {
      generateClassName: createGenerateClassName(),
      sheetsManager: new Map(),
    };
  }

  root = (
    <WrapperWithUpdate>
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
    </WrapperWithUpdate>
  );

  return root;
};
