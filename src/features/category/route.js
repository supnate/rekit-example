import {
  DefaultPage,
} from './index';

export default {
  path: 'category',
  indexRoute: { component: DefaultPage },
  childRoutes: [
    { path: 'default-page', component: DefaultPage },
  ],
};
