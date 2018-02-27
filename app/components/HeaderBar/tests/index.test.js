import React from 'react';
import { shallow } from 'enzyme';

import HeaderBar from '../index';

describe('<HeaderBar />', () => {
  it('should render when items are found', () => {
    const props = {
      titles: [],
      onButtonClick: () => {},
    };
    const renderedComponent = shallow(
      <HeaderBar {...props} />
    );
    expect(renderedComponent.find('div').length).toEqual(1);
  });
});
