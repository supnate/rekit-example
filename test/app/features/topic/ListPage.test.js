import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ListPage } from 'features/topic/ListPage';

describe('topic/ListPage', () => {
  it('renders node with correct class name', () => {
    const pageProps = {
      topic: {
        listData: [],
        needReloadList: true,
      },
      actions: {
        fetchTopicList: () => {},
      },
    };
    const renderedComponent = shallow(
      <ListPage {...pageProps} />
    );

    expect(
      renderedComponent.find('.topic-list-page').node
    ).to.exist;
  });
});
