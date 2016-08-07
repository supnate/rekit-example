import {
  DefaultPage,
} from './index';

export default {
  path: 'comment',
  indexRoute: { component: DefaultPage },
  childRoutes: [
    { path: 'default-page', component: DefaultPage },
  ],
};
