import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import memobind from 'memobind';
import * as actions from './actions';

class ListPage extends Component {
  static propTypes = {
    topic: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    if (this.props.topic.needReloadList) {
      this.props.actions.fetchTopicList();
    }
  }

  handleNewTopicBtnClick() {
    browserHistory.push('/topic/add');
  }

  handleRowClick(topicId) {
    browserHistory.push(`/topic/${topicId}`);
  }

  render() {
    const { fetchTopicListPending } = this.props.topic;
    return (
      <div className="topic-list-page">
        <h1>
          Topics
          <button className="btn-new-topic" onClick={memobind(this, 'handleNewTopicBtnClick')}>+ New Topic</button>
        </h1>
        {fetchTopicListPending && <div className="loading">Loading....</div>}

        <ul className="topic-list">
          {
            this.props.topic.listData.map(item => (
              <li
                className="topic-row"
                key={item.id}
                onClick={memobind(this, 'handleRowClick', item.id)}
                tabIndex="0"
              >
                <span className="title">{item.get('title')}</span>
                <span className="author">{item.get('author') || 'Anonymous'}</span>
                <span className="date">{item.createdAt.toString().replace(/\s*[\(（].*/g, '')}</span>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    topic: state.topic,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPage);
