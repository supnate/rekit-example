import App from '../containers/App';

import { Page404 } from '../components';
import homeRoute from '../features/home/route';
import topicRoute from '../features/topic/route';
import categoryRoute from '../features/category/route';
import commentRoute from '../features/comment/route';

export default [{
  path: '/',
  component: App,
  indexRoute: homeRoute.siteIndexRoute,
  childRoutes: [
    homeRoute,
    topicRoute,
    categoryRoute,
    commentRoute,
    { path: '*', name: '404', component: Page404 },
  ],
}];
