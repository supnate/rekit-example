import App from '../containers/App';

import { Page404 } from '../components';
import topicRoute from '../features/topic/route';
import commentRoute from '../features/comment/route';

export default [{
  path: '/',
  component: App,
  indexRoute: topicRoute.siteIndexRoute,
  childRoutes: [
    topicRoute,
    commentRoute,
    { path: '*', name: '404', component: Page404, hideInNav: true },
  ],
}];
