import { takeLatest } from 'redux-saga';
import { all, call, put } from 'redux-saga/effects';

import { refreshToken, retrieveFolders, retrieveFolderData } from 'services/googleDrive';

import { PAGE_LOAD } from './constants';
import { retrieveURLsSuccess, retrieveURLsFailure } from './actions';

export function* pageLoaded() {
  try {
    console.log('Page Loaded Saga Triggered');
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

export default function* watchPageLoad() {
  // console.log('listening for page load');
  yield takeLatest(PAGE_LOAD, pageLoaded);
}
