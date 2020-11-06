/* eslint-disable functional/no-let */
import test from 'ava';
import sinon from 'sinon';
import config from '../../config';
import KanvasErrorAPI from '../shared/KanvasErrorAPI';
import Auth from './auth';
import TokenProvider from './tokenProvider';

let auth: Auth;

test.beforeEach(async () => {
  auth = new Auth(
    {
      endpoint: config.apps.GEWAER_API,
      appKey: config.appkey,
    },
    new TokenProvider({
      domain: config.domain || null,
    })
  );
});

test.afterEach(() => sinon.restore());

test.serial('login success', async (t) => {
  auth.on('loggedIn', (token) => {
    t.assert(token);
  });
  const token = await auth.login(config.user, config.password);
  t.is(typeof token, 'string');
});

test.serial('login fail: Email is not registered', async (t) => {
  const error = await t.throwsAsync<KanvasErrorAPI>(
    auth.login('notemail@gmail.com', config.password)
  );
  t.is(error.message, 'Request failed with status code 404');
});

test.serial('login fail: Wrong credentials', async (t) => {
  const error = await t.throwsAsync<KanvasErrorAPI>(
    auth.login(config.user, 'bad password')
  );
  t.is(error.message, 'Request failed with status code 404');
});

test.serial('login from cookies', async (t) => {
  const token = await auth.login(config.user, config.password);
  await auth.logout();
  auth.tokenProvider.setToken(token);
  t.assert(auth.getToken());
});

test.serial('logout fail', async (t) => {
  auth.tokenProvider.removeToken();
  const kanvasError = await t.throwsAsync<KanvasErrorAPI>(auth.logout());
  t.is(kanvasError.errors.message, 'Missing Token');
});

test.serial('logout user', async (t) => {
  await auth.login(config.user, config.password);
  t.is(typeof auth.getToken(), 'string');

  await auth.logout();
  t.falsy(auth.getToken());
});

test.serial('registration fail: email taken', async (t) => {
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

test.serial('registration success', async (t) => {
  sinon.stub(auth.http, 'request').resolves({
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

test.serial('send password reset email fail', async (t) => {
  const error = await t.throwsAsync<KanvasErrorAPI>(
    auth.sendPasswordResetEmail('bad@email.com')
  );
  t.is(error.message, 'Request failed with status code 404');
});

test.serial('send password reset email', async (t) => {
  const resetPassword = await t.notThrowsAsync(
    auth.sendPasswordResetEmail(config.user)
  );
  t.falsy(resetPassword);
});

test.serial('reset password fail: bad token', async (t) => {
  const error = await t.throwsAsync<KanvasErrorAPI>(
    auth.resetPassword(config.password, config.password, 'badtoken')
  );
  t.is(error.errors.message, "This Key to reset password doesn't exist");
});

test.serial('reset password success', async (t) => {
  sinon.stub(auth.http, 'request').resolves({
    message: 'ok',
  });
  const resetPassword = await t.notThrowsAsync(
    auth.resetPassword(config.password, config.password, 'correcttoken')
  );
  t.falsy(resetPassword);
});
