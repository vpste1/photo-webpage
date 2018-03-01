/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  PAGE_LOAD,
  URL_SUCCESS,
  URL_FAIL,
} from './constants';

const initialState = fromJS({
  activePage: null,
  dataRetrieved: false,
  titleList: [],
  urlList: [],
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case PAGE_LOAD:
      console.log('PAGE LOAD REDUCED');
      return state
          .set('activePage', null);
    case URL_SUCCESS:
      console.log('Reducing URLS into state');
      console.log(action);
      return state
          .set('dataRetrieved', true)
          .set('urlList', action.payload.imageUrls)
          .set('titleList', action.payload.titles);
    case URL_FAIL:
      return state;
    default:
      return state;
  }
}

export default homePageReducer;
