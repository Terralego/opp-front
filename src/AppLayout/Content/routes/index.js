import { lazy } from 'react';

const Map = lazy(() => import('../../../views/Map'));

const Viewpoint = lazy(() => import('../../../views/Viewpoint'));
const Profile = lazy(() => import('../../../AppLayout/Profile'));

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
  {
    Component: Profile,
    path: '/create-account/:id/:token',
  },
];

export default routes;
