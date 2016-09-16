import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { CommentList } from 'src/features/comment';

describe('comment/CommentList', () => {
  const props = {
    topicId: '1',
    fetchCommentList: () => {},
    dismissFetchCommentListError: () => {},
    commentState: {
      needReloadList: false,
      listData: [],
    },
  };
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <CommentList {...props} />
    );

    expect(
      renderedComponent.find('.comment-comment-list').node
    ).to.exist;
  });
});
