/* eslint-disable functional/no-let */
import test from 'ava';
import config from '../../config';
import Auth from '../auth/auth';
import TokenProvider from '../auth/tokenProvider';
import KanvasErrorAPI from '../shared/KanvasErrorAPI';
import Users from './users';

let auth: Auth;
let users: Users;

test.beforeEach(async () => {
	auth = new Auth(
		{
			endpoint: config.apps.GEWAER_API,
			appKey: config.appkey
		},
		new TokenProvider({
			domain: config.domain || null
		})
	);

	users = new Users(
		{
			endpoint: config.apps.GEWAER_API,
			appKey: config.appkey
		},
		auth.tokenProvider
	);

	await auth.login(config.user, config.password);
});

test.serial('user data fetch success', async(t) => {
	const data = await users.getById();
	t.is(data.email, config.user);
});

test.serial('user password change success', async (t) => {
	await users.getById();
	const data = await users.changePassword(config.password, config.password, config.password);
	t.truthy(data && data.email);
});

test.serial('user current password failure', async (t) => {
	await users.getById();
	const error = await t.throwsAsync<KanvasErrorAPI>(
		users.changePassword('randomstring', config.password, config.password)
	);
	t.is(error.errors.message, ' Your current password is incorrect .');
});

test.serial('user password confirm failure', async (t) => {
	await users.getById();
	const error = await t.throwsAsync<KanvasErrorAPI>(
		users.changePassword(config.password, 'randomstring', config.password)
	);
	t.is(error.errors.message, 'New password and confirmation do not match.');
});