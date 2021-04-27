import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AuthProvider from '@terralego/core/modules/Auth';
import { ApiProvider } from '@terralego/core/modules/Api';

import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import 'normalize.css';

import { QueryClient, QueryClientProvider } from 'react-query';

import './config/i18n';
import withEnv from './config/withEnv';
import Main from './AppLayout';
import SettingsProvider from './components/SettingsProvider';

const queryClient = new QueryClient();

export const App = ({ env: { API_PROVIDER } }) => (
  <DndProvider backend={HTML5Backend}>
    <QueryClientProvider client={queryClient}>
      <ApiProvider host={API_PROVIDER}>
        <SettingsProvider>
          <AuthProvider>
            <BrowserRouter>
              <Main />
            </BrowserRouter>
          </AuthProvider>
        </SettingsProvider>
      </ApiProvider>
    </QueryClientProvider>
  </DndProvider>
);

export default withEnv(App);
