
import homePageReducer from '../reducer';

import {
  pageLoadAction,
  retrieveURLsSuccess,
  retrieveURLsFailure } from '../actions';

describe('Container [App] - reducers', () => {
  let state;
  beforeEach(() => {
  });
  it('should return the initial state', () => {
    expect(homePageReducer(undefined, {})).toMatchSnapshot();
  });
  it('should handle the pageLoadAction action correctly', () => {
    expect(homePageReducer(state, pageLoadAction())).toMatchSnapshot();
  });
  it('should handle the retrieveURLsSuccess action correctly', () => {
    expect(homePageReducer(state, retrieveURLsSuccess(token))).toMatchSnapshot();
  });
  it('should handle the retrieveURLsFailure action correctly', () => {
    expect(homePageReducer(state, retrieveURLsFailure())).toMatchSnapshot();
  });
});
