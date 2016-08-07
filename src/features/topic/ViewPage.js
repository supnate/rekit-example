import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import memobind from 'memobind';
import * as actions from './actions';
import { saveComment, fetchCommentList, dismissFetchCommentListError, dismissSaveCommentError } from '../comment/actions';

import { CommentForm, CommentList } from '../comment';

class ViewPage extends Component {
  static propTypes = {
    topic: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.actions.getTopic(this.props.params.topicId);
  }

  componentWillUnmount() {
    this.props.actions.dismissGetTopicError();
    this.props.actions.dismissSaveCommentError();
  }

  getTopicData() {
    return this.props.topic.byId[this.props.params.topicId];
  }

  handleBackBtnClick() {
    browserHistory.goBack();
  }

  renderBackBtn() {
    return (
      <button className="btn-back" onClick={memobind(this, 'handleBackBtnClick')}>Back</button>
    );
  }

  renderLoading() {
    return (
      <div className="topic-view-page">
        {this.renderBackBtn()}
        <div className="loading">Loading...</div>
      </div>
    );
  }

  renderLoadingError() {
    const err = this.props.topic.getTopicError;
    return (
      <div className="topic-view-page">
        {this.renderBackBtn()}
        <div className="error">Failed to load the topic: {err.message || err.toString()}</div>
      </div>
    );
  }

  render() {
    const { getTopicPending, getTopicError } = this.props.topic;
    const topicData = this.getTopicData();

    if (getTopicError) {
      return this.renderLoadingError();
    }

    if (getTopicPending || !topicData) {
      return this.renderLoading();
    }

    return (
      <div className="topic-view-page">
        {this.renderBackBtn()}
        <h1>
          {topicData.get('title')}
        </h1>
        <div className="author-date">
          <span className="author">{topicData.get('author') || 'Anonymous'}</span>
          <span className="date">{topicData.createdAt.toString().replace(/\s*[\(（].*/g, '')}</span>
        </div>
        <div className="topic-content">
          {topicData.get('content').split(/\n+/).map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <CommentList
          topicId={this.props.params.topicId}
          fetchCommentList={this.props.actions.fetchCommentList}
          dismissFetchCommentListError={this.props.actions.dismissFetchCommentListError}
          commentState={this.props.comment}
        />
        <CommentForm
          topicId={this.props.params.topicId}
          saveComment={this.props.actions.saveComment}
          saveCommentPending={this.props.comment.saveCommentPending || false}
          saveCommentError={this.props.comment.saveCommentError || false}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    topic: state.topic,
    comment: state.comment,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...actions,
      saveComment,
      dismissSaveCommentError,
      fetchCommentList,
      dismissFetchCommentListError,
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPage);
