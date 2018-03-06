import { fromJS } from 'immutable';

import { makeSelectTitleList, makeSelectUrlList, makeSelectDataRetrieved } from '../selectors';

describe('Container [HomePage] - selectors', () => {
  describe('makeSelectTitleList', () => {
    it('should select the list of folder titles', () => {
      const globalState = fromJS({
        activePage: null,
        dataRetrieved: false,
        titleList: [],
        urlList: [],
      });
      const mockedState = fromJS({
        global: globalState,
      });
      expect(makeSelectTitleList()(mockedState)).toEqual(globalState.get('titleList').toJS());
    });
  });
  describe('makeSelectUrlList', () => {
    it('should select the list of image URLs', () => {
      const globalState = fromJS({
        activePage: null,
        dataRetrieved: false,
        titleList: [],
        urlList: [],
      });
      const mockedState = fromJS({
        global: globalState,
      });
      expect(makeSelectUrlList()(mockedState)).toEqual(globalState.get('urlList').toJS());
    });
  });
  describe('makeSelectDataRetrieved', () => {
    it('should select the state of dataRetrieved', () => {
      const globalState = fromJS({
        activePage: null,
        dataRetrieved: false,
        titleList: [],
        urlList: [],
      });
      const mockedState = fromJS({
        global: globalState,
      });
      expect(makeSelectDataRetrieved()(mockedState)).toEqual(globalState.get('dataRetrieved').toJS());
    });
  });
});
