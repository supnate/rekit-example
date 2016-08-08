import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import memobind from 'memobind';
import * as actions from './actions';

class EditPage extends Component {
  static propTypes = {
    topic: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    title: '',
    author: '',
    content: '',
    formError: false, // mark the form has been validated
  };

  validateForm() {
    const hasError =
      !this.state.title.trim()
      || !this.state.author.trim()
      || !this.state.content.trim()
      ;
    this.setState({
      formError: hasError,
    });
    return !hasError;
  }

  handleTitleChange(evt) {
    this.setState({
      title: evt.target.value,
    });
  }

  handleAuthorChange(evt) {
    this.setState({
      author: evt.target.value,
    });
  }

  handleContentChange(evt) {
    this.setState({
      content: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if (!this.validateForm()) {
      return;
    }
    this.props.actions.saveTopic({
      author: this.state.author,
      title: this.state.title,
      content: this.state.content,
    }).then(() => {
      browserHistory.push('/');
    });
  }

  render() {
    const { saveTopicError, saveTopicPending } = this.props.topic;
    const { formError, title, author, content } = this.state;
    const titleError = formError && !title.trim();
    const authorError = formError && !author.trim();
    const contentError = formError && !content.trim();
    return (
      <div className="topic-edit-page">
        <h1>New Topic</h1>
        <form onSubmit={memobind(this, 'handleSubmit')}>
          <fieldset disabled={saveTopicPending}>
            <div className="form-row">
              <label><span title="Required.">* </span>Title: </label>
              <input value={this.state.title} onChange={memobind(this, 'handleTitleChange')} />
              {titleError && <div className="error-tip">Title is required.</div>}
            </div>

            <div className="form-row">
              <label><span title="Required.">* </span>Your name: </label>
              <input value={this.state.author} onChange={memobind(this, 'handleAuthorChange')} />
              {authorError && <div className="error-tip">Author is required.</div>}
            </div>

            <div className="form-row">
              <label><span title="Required.">* </span>Content: </label>
              <textarea value={this.state.content} onChange={memobind(this, 'handleContentChange')} />
              {contentError && <div className="error-tip">Content is required.</div>}
            </div>
          </fieldset>

          <div className="form-row">
            <button type="submit" disabled={saveTopicPending}>
              {saveTopicPending ? 'Submitting...' : 'Submit'}
            </button>
            {saveTopicError && <div className="error-tip">Save topic failed: {saveTopicError}</div>}
          </div>
        </form>
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
)(EditPage);
