import { lazy } from 'react';

const Map = lazy(() => import('../../../views/Map'));

const Viewpoint = lazy(() => import('../../../views/Viewpoint'));

const routes = [
  {
    Component: Map,
    path: '/',
    exact: true,
  },
  {
    Component: Viewpoint,
    path: '/viewpoint/:id/:imageView?',
  },
];

export default routes;
