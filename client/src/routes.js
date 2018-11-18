import React from 'react';
import Loadable from 'react-loadable';

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

/*
const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  laodinng: Loading,
});
*/


const Sales = Loadable({
  loader: () => import('./views/Sales'),
  loading: Loading,
});

const Purchases = Loadable({
  loader: () => import('./views/Purchases'),
  loading: Loading,
});

const Inventory = Loadable({
  loader: () => import('./views/Inventory'),
  loading: Loading,
});

const Finances = Loadable({
  loader: () => import('./views/Finances'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
//  { path: '/', name: 'Dashboard', component: DefaultLayout },
  { path: '/sales', name: 'Sales', component: Sales },
  { path: '/purchases', name: 'Purchases', component: Purchases },
  { path: '/inventory', name: 'Inventory', component: Inventory },
  { path: '/finances', name: 'finances', component: Finances },

];

export default routes;