// import moxios from 'moxios';
// import sinon from 'sinon';
import { refreshTokenConfig } from '../googleDrive';

describe('refreshTokenConfig()', () => {
  it('returns the baseURL for GoogleAPI', () => {
    expect(refreshTokenConfig()).toEqual({ baseURL: 'https://www.googleapis.com/oauth2/v4' });
  });
});

// This is trivial testing; need to be more in depth (refer to Ben's)
