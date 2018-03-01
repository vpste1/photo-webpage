import moxios from 'moxios';
// import sinon from 'sinon';

import { refreshTokenConfig,
        googleAuthConfig,
         } from '../googleDrive';

describe('googleDrive', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  // it('parseResults', (done) => {
  //   const responseSuccess = { status: 200, data: { a: 'a', b: 'b', hits: { hits: [], max_score: 10, total: 0 } } };
  //   const parseSuccess = { hits: 0, max_score: 10, items: [] };
  //   const responseFailure = { status: 404 };
  //   expect(parseResults(responseSuccess)).toMatchObject(parseSuccess);
  //   expect(parseResults(responseFailure)).toBe(null);
  //   done();
  // });

  it('refresh token via GET request', (done) => {
    expect(refreshTokenConfig()).toEqual({ baseURL: 'https://www.googleapis.com/oauth2/v4' });
    done();
  });

  it('returns the baseURL for GoogleAPI wtih auth parameters', (done) => {
    const token = '1Iv8dHdXs7Vvdz0PC9lnU2fE-oBmXOIlh';
    const folderId = 'folder';
    expect(googleAuthConfig(token, folderId)).toEqual({
      baseURL: `https://www.googleapis.com/drive/v2/files/${folderId}`, // id of my public folder
      timeout: 5000,
      headers: { Authorization: `Bearer ${token}` },
    });
    done();
  });
});
