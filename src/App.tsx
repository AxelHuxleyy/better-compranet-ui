import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { Dashboard, NotFound } from './pages';
import { store as storeReducer } from './app/store';

export const App = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export const WrappedApp = () => {
  const queryClient = new QueryClient();

  return (
    <HashRouter>
      <Provider store={storeReducer}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </HashRouter>
  );
};
