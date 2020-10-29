/* eslint-disable functional/no-let */
import test from 'ava';

import config from '../../config';

import Auth  from './auth';
let auth: Auth;

test.before(async () => {
  auth = new Auth({
    endpoint: config.apps.GEWAER_API,
    appKey: config.appkey,
  });
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
  t.is(typeof auth.token, 'string');

  await auth.logout();
  t.is(auth.token, null);
});
