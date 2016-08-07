import React, { Component, PropTypes } from 'react';
import memobind from 'memobind';

export default class CommentForm extends Component {
  static propTypes = {
    topicId: PropTypes.string.isRequired,
    saveComment: PropTypes.func.isRequired,
    saveCommentPending: PropTypes.bool.isRequired,
    saveCommentError: PropTypes.any.isRequired,
  };

  state = {
    author: '',
    content: '',
    formError: false,
    saveSuccessTip: false,
  };

  validateForm() {
    const hasError =
      !this.state.author.trim()
      || !this.state.content.trim()
      ;
    this.setState({
      formError: hasError,
    });
    return !hasError;
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

    this.props.saveComment(this.props.topicId, {
      author: this.state.author.trim(),
      content: this.state.content.trim(),
    }).then(() => {
      this.setState({
        author: '',
        content: '',
        saveSuccessTip: true,
      });

      window.setTimeout(() => {
        this.setState({
          saveSuccessTip: false,
        });
      }, 1500);
    });
  }

  render() {
    const { saveCommentError, saveCommentPending } = this.props;
    const { formError, author, content, saveSuccessTip } = this.state;
    const authorError = formError && !author.trim();
    const contentError = formError && !content.trim();

    return (
      <div className="comment-comment-form">
        <h4>Leave a comment:</h4>
        <form onSubmit={memobind(this, 'handleSubmit')}>
          <fieldset disabled={saveCommentPending}>
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
            <button type="submit" disabled={saveCommentPending}>
              {saveCommentPending ? 'Submitting...' : 'Submit'}
            </button>
            {saveCommentError && <div className="error-tip">Save comment failed: {saveCommentError.message || saveCommentError.toString()}</div>}
            {saveSuccessTip && <div className="success-tip">Comment success!</div>}
          </div>
        </form>
      </div>
    );
  }
}
