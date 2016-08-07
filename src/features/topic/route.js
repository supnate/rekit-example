import {
  EditPage,
  ListPage,
  ViewPage,
} from './index';

export default {
  path: 'topic',
  childRoutes: [
    { path: 'add', component: EditPage },
    { path: 'list-page', component: ListPage },
    { path: ':topicId', component: ViewPage },
  ],
};
