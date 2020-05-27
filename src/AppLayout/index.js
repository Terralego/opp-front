import React from 'react';

import AppProvider from './Provider/Provider';
import { connectAppProvider } from './context';
import Main from './Main';

const ConnectedMainView = connectAppProvider('isNavBarVisible')(Main);

export default () => (
  <AppProvider>
    <ConnectedMainView />
  </AppProvider>
);
