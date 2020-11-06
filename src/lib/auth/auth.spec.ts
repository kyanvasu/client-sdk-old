/* eslint-disable functional/no-let */
import test from 'ava';
import sinon, { SinonSandbox } from 'sinon';
import config from '../../config';
import KanvasErrorAPI from '../shared/KanvasErrorAPI';

import Auth from './auth';
import TokenProvider from './tokenProvider';
let auth: Auth;
let sandbox: SinonSandbox;

test.before(async () => {
  auth = new Auth(
    {
      endpoint: config.apps.GEWAER_API,
      appKey: config.appkey,
    },
    new TokenProvider({
      domain: config.domain || null
    })
  );

  sandbox = sinon.createSandbox();
});

test.afterEach(() => {
  sandbox.restore();
});

test('login success', async (t) => {
  auth.on('loggedIn', (token) => {
    t.assert(token);
  });
  const token = await auth.login(config.user, config.password);
  t.is(typeof token, 'string');
});

test('login fail: Email is not registered', async (t) => {
  const error = await t.throwsAsync<KanvasErrorAPI>(
    auth.login('notemail@gmail.com', config.password)
  );
  t.is(error.message, 'Request failed with status code 404');
});

test('login fail: Wrong credentials', async (t) => {
  const error = await t.throwsAsync<KanvasErrorAPI>(
    auth.login(config.user, 'bad password')
  );
  t.is(error.message, 'Request failed with status code 404');
});

test('login from cookies', async (t) => {
  const token = await auth.login(config.user, config.password);
  await auth.logout();
  auth.tokenProvider.setToken(token);
  t.assert(auth.getToken());
});

test('logout user', async (t) => {
  await auth.login(config.user, config.password);
  t.is(typeof auth.getToken(), 'string');

  await auth.logout();
  t.falsy(auth.getToken());
});

test('registration fail: email taken', async (t) => {
  const error = await t.throwsAsync<KanvasErrorAPI>(
    auth.register({
      lastname: 'Doe',
      firstname: 'John',
      email: config.user,
      password: config.password,
      verify_password: config.password,
      default_company: 'John Corp',
    })
  );
  t.is(error.errors.message, 'Users This email already has an account.');
});

test('registration success', async (t) => {
  sandbox.stub(auth.http, 'request').resolves({
    session: {
      token: 'token',
    },
  });
  const token = await auth.register({
    lastname: 'Doe',
    firstname: 'John',
    email: 'test@example.com',
    password: config.password,
    verify_password: config.password,
    default_company: 'John Corp',
  });
  t.truthy(token);
});
