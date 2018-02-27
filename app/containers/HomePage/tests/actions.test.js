import {
  DEFAULT_ACTION,
  PAGE_LOAD,
  URL_SUCCESS,
  URL_FAIL,
} from '../constants';


import {
  defaultAction,
  pageLoadAction,
  retrieveURLsSuccess,
  retrieveURLsFailure } from '../actions';

describe('Container [HomePage] - actions', () => {
  describe('defaultAction', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: DEFAULT_ACTION,
      };

      expect(defaultAction()).toEqual(expectedResult);
    });
  });

  describe('pageLoadAction', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: PAGE_LOAD,
      };
      expect(pageLoadAction()).toEqual(expectedResult);
    });
  });
  describe('retrieveURLsSuccess', () => {
    it('should return the correct type and the passed login information', () => {
      const titles = [];
      const imageUrls = [];
      const expectedResult = {
        type: URL_SUCCESS,
        payload: { titles,
          imageUrls,
        },
      };
      expect(retrieveURLsSuccess(titles, imageUrls)).toEqual(expectedResult);
    });
  });
  describe('retrieveURLsFailure', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: URL_FAIL,
      };
      expect(retrieveURLsFailure()).toEqual(expectedResult);
    });
  });
});
