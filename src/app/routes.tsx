import { createBrowserRouter, Outlet } from 'react-router';
import { Layout } from './components/Layout';
import { DemoNavigator } from './components/DemoNavigator';
import Login from './pages/Login';
import { DashboardRouter } from './pages/DashboardRouter';
import ActivityModule from './pages/ActivityModule';
import ActivityDetail from './pages/ActivityDetail';
import Reports from './pages/Reports';
import Progress from './pages/Progress';

function Root() {
  return (
    <>
      <Outlet />
      <DemoNavigator />
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: '/',
        Component: Layout,
        children: [
          { index: true, Component: DashboardRouter },
          { path: 'activities', Component: ActivityModule },
          { path: 'activities/:id', Component: ActivityDetail },
          { path: 'reports', Component: Reports },
          { path: 'progress', Component: Progress },
        ],
      },
    ],
  },
]);
