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