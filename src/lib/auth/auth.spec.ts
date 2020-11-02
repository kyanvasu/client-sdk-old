/* eslint-disable functional/no-let */
import test from 'ava';

import config from '../../config';

import Auth  from './auth';
import TokenProvider from './tokenProvider';
let auth: Auth;

test.before(async () => {
  auth = new Auth({
    endpoint: config.apps.GEWAER_API,
    appKey: config.appkey,
  },
    new TokenProvider()
  );
});

test('login user', async (t) => {
  const token = await auth.login(config.user, config.password);
  t.is(typeof token, 'string');
});

test('login fail', async (t) => {
  const error = await t.throwsAsync(auth.login(config.user, "bad password"))
  t.is(error.message, "Request failed with status code 404")
});

test('logout user', async (t) => {
  await auth.login(config.user, config.password);
  t.is(typeof auth.getToken(), 'string');

  await auth.logout();
  t.falsy(auth.getToken())
});

test('login from cookies', async (t) => {
  const token =  await auth.login(config.user, config.password);
  await auth.logout();
  auth.tokenProvider.setToken(token);
  t.assert(auth.getToken())
});
