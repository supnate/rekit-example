import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { EditPage } from 'features/topic/EditPage';

describe('topic/EditPage', () => {
  it('renders node with correct class name', () => {
    const pageProps = {
      topic: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <EditPage {...pageProps} />
    );

    expect(
      renderedComponent.find('.topic-edit-page').node
    ).to.exist;
  });
});
