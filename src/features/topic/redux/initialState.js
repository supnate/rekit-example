const initialState = {
  byId: {},
  pageSize: 10,
  currentPage: 1,
  needReloadList: true,
  listData: [],

  saveTopicPending: false,
  saveTopicError: null,
  fetchTopicListPending: false,
  fetchTopicListError: null,
  getTopicPending: false,
  getTopicError: null,
};

export default initialState;
