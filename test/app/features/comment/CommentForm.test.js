import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { CommentForm } from 'src/features/comment';

describe('comment/CommentForm', () => {
  it('renders node with correct class name', () => {
    const props = {
      topicId: '1',
      saveComment: () => {},
      saveCommentPending: false,
      saveCommentError: false,
    };
    const renderedComponent = shallow(
      <CommentForm {...props} />
    );

    expect(
      renderedComponent.find('.comment-comment-form').node
    ).to.exist;
  });
});
