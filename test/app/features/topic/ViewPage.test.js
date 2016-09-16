import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { ViewPage } from 'features/topic/ViewPage';

describe('topic/ViewPage', () => {
  it('renders node with correct class name', () => {
    const pageProps = {
      topic: {
        byId: {},
      },
      comment: {
        listData: [],
      },
      params: {
        topicId: '1',
      },
      actions: {
        getTopic: sinon.spy(),
      },
    };
    const renderedComponent = shallow(
      <ViewPage {...pageProps} />
    );

    expect(
      renderedComponent.find('.topic-view-page').node
    ).to.exist;
  });
});
