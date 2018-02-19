import React from 'react';
import { shallow } from 'enzyme';

import PhotoCard from '../index';

describe('<PhotoCard />', () => {
  it('Renders a <div>', () => {
    const renderedComponent = shallow(
      <PhotoCard />
    );
    expect(
      renderedComponent.find('div').node
    ).toBeDefined();
  });
  it('Renders an <Image>', () => {
    const renderedComponent = shallow(
      <PhotoCard />
    );
    console.log(renderedComponent);
    expect(
      renderedComponent.find('img').node
    ).toBeDefined();
  });
});
