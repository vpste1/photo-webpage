import moxios from 'moxios';
import sinon from 'sinon';

import { refreshTokenConfig,
         googleAuthConfig,
         refreshToken } from '../googleDrive';

import { getRefreshToken,
         // getFoldersPlainSuccess,
         // getFoldersDataPlainSuccess,
       } from '../../mocks/getGoogleDriveQueryMock';

describe('googleDrive', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('refreshToken', (done) => {
    const onFulfilled = sinon.spy();
    refreshToken().then(onFulfilled);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      // Override with a mocked response via a specified payload.
      request.respondWith(getRefreshToken).then(() => {
        console.log(onFulfilled);
        expect(onFulfilled.getCall(0).args[0]).toMatchObject(false);
        done();
      });
    });
  });

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
