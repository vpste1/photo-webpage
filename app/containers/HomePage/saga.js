import { takeLatest } from 'redux-saga';
import { all, call, put } from 'redux-saga/effects';

import { refreshToken, retrieveFolders, retrieveFolderData } from 'services/googleDrive';

import { PAGE_LOAD } from './constants';
import { retrieveURLsSuccess, retrieveURLsFailure } from './actions';

export function* pageLoaded() {
  try {
    // console.log('Page Loaded Saga Triggered');
    const tokenResponse = yield call(refreshToken);
    const token = tokenResponse.data.access_token;
    const childrenResponse = yield call(retrieveFolders, token);
    const folders = childrenResponse.data.items;
    const folderInfo = yield all(folders.map((folder) => call(retrieveFolderData, token, folder.id)));
    const folderTitles = folderInfo.map((folder) => folder.title);
    const images = yield all(folders.map((folder) => call(retrieveFolderData, token, folder.id, '/children')));
    const imageUrls = images.map((imageSet) => imageSet.items.map((image) => `https://drive.google.com/uc?export=view&id=${image.id}`));
    yield put(retrieveURLsSuccess(folderTitles, imageUrls));
  } catch (err) {
    yield put(retrieveURLsFailure(err));
  }
}

const hahga =
{ data: { kind: 'drive#childList', etag: '"G9mQazc6pdRCuGfUPB_oyY074Ug/EVln82SpWnze2NanHI2Ywd6IDDA"', selfLink: 'https://www.googleapis.com/drive/v2/files/1RrkudbMZARFgvZdVCDL__N0ZWfsIyqR_/children', items: [{ kind: 'drive#childReference', id: '19apcvuey2MGIqMwzOnpPwD5xDEqyzp_x', selfLink: 'https://www.googleapis.com/drive/v2/files/1RrkudbMZARFgvZdVCDL__N0ZWfsIyqR_/children/19apcvuey2MGIqMwzOnpPwD5xDEqyzp_x', childLink: 'https://www.googleapis.com/drive/v2/files/19apcvuey2MGIqMwzOnpPwD5xDEqyzp_x' }, { kind: 'drive#childReference', id: '17xlLmtuo_Pi1vya1isVPdVBYRVHI8diR', selfLink: 'https://www.googleapis.com/drive/v2/files/1RrkudbMZARFgvZdVCDL__N0ZWfsIyqR_/children/17xlLmtuo_Pi1vya1isVPdVBYRVHI8diR', childLink: 'https://www.googleapis.com/drive/v2/files/17xlLmtuo_Pi1vya1isVPdVBYRVHI8diR' }, { kind: 'drive#childReference', id: '1XWYlHKTHUZ56xGSauq7B_7jpWzHVbEEM', selfLink: 'https://www.googleapis.com/drive/v2/files/1RrkudbMZARFgvZdVCDL__N0ZWfsIyqR_/children/1XWYlHKTHUZ56xGSauq7B_7jpWzHVbEEM', childLink: 'https://www.googleapis.com/drive/v2/files/1XWYlHKTHUZ56xGSauq7B_7jpWzHVbEEM' }, { kind: 'drive#childReference', id: '1B0UctqNg7jrW2vymITjBOVglGftEiIS1', selfLink: 'https://www.googleapis.com/drive/v2/files/1RrkudbMZARFgvZdVCDL__N0ZWfsIyqR_/children/1B0UctqNg7jrW2vymITjBOVglGftEiIS1', childLink: 'https://www.googleapis.com/drive/v2/files/1B0UctqNg7jrW2vymITjBOVglGftEiIS1' }, { kind: 'drive#childReference', id: '1INFsQzpg87HYLAJhM84hT7nQ2Wl46yPb', selfLink: 'https://www.googleapis.com/drive/v2/files/1RrkudbMZARFgvZdVCDL__N0ZWfsIyqR_/children/1INFsQzpg87HYLAJhM84hT7nQ2Wl46yPb', childLink: 'https://www.googleapis.com/drive/v2/files/1INFsQzpg87HYLAJhM84hT7nQ2Wl46yPb' }, { kind: 'drive#childReference', id: '1rnSRGpSspfgZjqFKPTD75ow6iX4ueU_W', selfLink: 'https://www.googleapis.com/drive/v2/files/1RrkudbMZARFgvZdVCDL__N0ZWfsIyqR_/children/1rnSRGpSspfgZjqFKPTD75ow6iX4ueU_W', childLink: 'https://www.googleapis.com/drive/v2/files/1rnSRGpSspfgZjqFKPTD75ow6iX4ueU_W' }, { kind: 'drive#childReference', id: '12DrRxNzkLvZF4cFO8hRgZTRfHc5RuZGx', selfLink: 'https://www.googleapis.com/drive/v2/files/1RrkudbMZARFgvZdVCDL__N0ZWfsIyqR_/children/12DrRxNzkLvZF4cFO8hRgZTRfHc5RuZGx', childLink: 'https://www.googleapis.com/drive/v2/files/12DrRxNzkLvZF4cFO8hRgZTRfHc5RuZGx' }, { kind: 'drive#childReference', id: '1CCI817sbUVxucQz0DhGfP_LgsWYo8Yx1', selfLink: 'https://www.googleapis.com/drive/v2/files/1RrkudbMZARFgvZdVCDL__N0ZWfsIyqR_/children/1CCI817sbUVxucQz0DhGfP_LgsWYo8Yx1', childLink: 'https://www.googleapis.com/drive/v2/files/1CCI817sbUVxucQz0DhGfP_LgsWYo8Yx1' }, { kind: 'drive#childReference', id: '1wNXahB4OP2-3xI1R7Ir4_DNV3n6-DOPD', selfLink: 'https://www.googleapis.com/drive/v2/files/1RrkudbMZARFgvZdVCDL__N0ZWfsIyqR_/children/1wNXahB4OP2-3xI1R7Ir4_DNV3n6-DOPD', childLink: 'https://www.googleapis.com/drive/v2/files/1wNXahB4OP2-3xI1R7Ir4_DNV3n6-DOPD' }, { kind: 'drive#childReference', id: '1HiXv1FrQ9eJdu0yGXqV42QCtATc6wO8r', selfLink: 'https://www.googleapis.com/drive/v2/files/1RrkudbMZARFgvZdVCDL__N0ZWfsIyqR_/children/1HiXv1FrQ9eJdu0yGXqV42QCtATc6wO8r', childLink: 'https://www.googleapis.com/drive/v2/files/1HiXv1FrQ9eJdu0yGXqV42QCtATc6wO8r' }] }, status: 200, statusText: '', headers: { date: 'Thu, 01 Mar 2018 03:55:23 GMT', 'content-encoding': 'gzip', 'content-length': '621', expires: 'Thu, 01 Mar 2018 03:55:23 GMT', server: 'GSE', etag: '"G9mQazc6pdRCuGfUPB_oyY074Ug/EVln82SpWnze2NanHI2Ywd6IDDA"', 'content-type': 'application/json; charset=UTF-8', vary: 'Origin, X-Origin', 'cache-control': 'private, max-age=0, must-revalidate, no-transform' }, config: { transformRequest: {}, transformResponse: {}, timeout: 5000, xsrfCookieName: 'XSRF-TOKEN', xsrfHeaderName: 'X-XSRF-TOKEN', maxContentLength: -1, headers: { Accept: 'application/json, text/plain, */*', Authorization: 'Bearer ya29.GlxxBeliY7xk7RSL6PILYcM5cnhYDAzK61_6l8HUwhhJLzqJNPLYXkT6ZgBV8bUE2OUZu_vL_XV9k9KU5bMTHu1JUlhFFb30gmEI0A-Suf1-0-WASSq8Meej5KvSBw' }, baseURL: 'https://www.googleapis.com/drive/v2/files/1RrkudbMZARFgvZdVCDL__N0ZWfsIyqR_', method: 'get', url: 'https://www.googleapis.com/drive/v2/files/1RrkudbMZARFgvZdVCDL__N0ZWfsIyqR_/children' }, request: {} };

export default function* watchPageLoad() {
  // console.log('listening for page load');
  yield takeLatest(PAGE_LOAD, pageLoaded);
}
