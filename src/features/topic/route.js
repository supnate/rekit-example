import {
  EditPage,
  ListPage,
  ViewPage,
} from './index';

export default {
  path: '',
  name: '',
  childRoutes: [
    { path: '', component: ListPage, name: 'Topic List', isIndex: true },
    { path: 'topic/add', component: EditPage, name: 'New Topic' },
    { path: 'topic/:topicId', component: ViewPage },
  ],
};
