import React from 'react';
import { renderToString } from 'react-dom/server';
import { JssProvider } from 'react-jss';

/* eslint-disable import/no-unresolved */
import getMuiContext from './src/common/getMuiContext';
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
  // Get the context of the page to collected side effects.
  const muiContext = getMuiContext();

  const bodyHtml = renderToString(
    <JssProvider
      registry={muiContext.sheetsRegistry}
      generateClassName={muiContext.generateClassName}
    >
      <MuiRoot muiContext={muiContext}>
        {React.cloneElement(bodyComponent, {
          muiContext,
        })}
      </MuiRoot>
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
        __html: muiContext.sheetsRegistry.toString(),
      }}
    />,
  ]);
};
