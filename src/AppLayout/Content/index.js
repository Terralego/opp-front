import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import Loading from '../../components/Loading';
import routes from './routes';

const Error404 = lazy(() => import('../../views/Error404'));

export const Content = () => (
  <div className="main__content">
    <Switch>
      {routes.map(({ Component, path, ...props }) => (
        <Route key={path} path={path} {...props}>
          <Suspense fallback={<Loading />}>
            <Component />
          </Suspense>
        </Route>
      ))}
      <Suspense fallback={<Loading />}>
        <Error404 />
      </Suspense>
    </Switch>
  </div>
);

export default Content;
