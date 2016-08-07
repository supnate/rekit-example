import {
  EditPage,
  ListPage,
  ViewPage,
} from './index';

export default {
  path: 'topic',
  name: '',
  siteIndexRoute: { component: ListPage },
  childRoutes: [
    { path: '/', component: ListPage, name: 'Home' },
    { path: 'add', component: EditPage, name: 'New Topic' },
    { path: ':topicId', component: ViewPage, hideInNav: true, },
  ],
};
