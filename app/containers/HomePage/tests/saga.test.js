import { takeLatest, put } from 'redux-saga/effects';

import watchPageLoad, { pageLoaded } from '../saga';
import { PAGE_LOAD } from '../constants';
import { retrieveURLsSuccess, retrieveURLsFailure } from '../actions';

describe('Container [App] - sagas', () => { /* eslint-disable redux-saga/yield-effects */
  describe('pageLoaded Saga', () => {
    let pageLoadedGenerator;
    beforeEach(() => {
      pageLoadedGenerator = pageLoaded();
      const tokenCallDescriptor = pageLoadedGenerator.next().value;
      console.log('&&&');
      console.log(tokenCallDescriptor);
      expect(tokenCallDescriptor).toMatchSnapshot();

      const childrenCallDescriptor = pageLoadedGenerator.next().value;
      console.log('***&&&');
      console.log(childrenCallDescriptor);
      expect(childrenCallDescriptor).toMatchSnapshot();
    });
    it('should dispatch retrieveURLsSuccess action if the API is hit successfully', () => {
      const titles = ['title1', 'title2'];
      const imageUrls = ['url1', 'url2'];
      const putDescriptor = pageLoadedGenerator.next(titles, imageUrls).value;
      expect(putDescriptor).toEqual(put(retrieveURLsSuccess(titles, imageUrls)));
    });
    it('should dispatch retrieveURLsFailure action if an error is thrown', () => {
      const response = new Error('Unable to reach API');
      const putDescriptor = pageLoadedGenerator.throw(response).value;
      expect(putDescriptor).toEqual(put(retrieveURLsFailure(response)));
    });
  });

  describe('watchPageLoad Saga', () => {
    const watchPageLoadSaga = watchPageLoad();
    it('works with unit tests', () => {
      const takeLatestDescriptor = watchPageLoadSaga.next().value;
      expect(takeLatestDescriptor).toEqual(takeLatest(PAGE_LOAD, pageLoaded));
    });
  });
});
