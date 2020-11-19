/* eslint-disable functional/no-let */
import test from 'ava';
import config from '../../config';
import Auth from '../auth/auth';
import TokenProvider from '../auth/tokenProvider';
import KanvasErrorAPI from '../shared/KanvasErrorAPI';
import Menu from './menu';

let auth: Auth;
let menu: Menu;

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

	menu = new Menu(
		{
			endpoint: config.apps.GEWAER_API,
			appKey: config.appkey
		},
		auth.tokenProvider
	);

	await auth.login(config.user, config.password);
});


test.serial('get menu by name failure', async (t) => {
	const error = await t.throwsAsync<KanvasErrorAPI>(
		menu.getByName('noexiste')
	);
	t.is(error.errors.message, 'Menus Record not found');
});

test.serial('get menu by id success', async (t) => {
	const mainMenu = await menu.getByName('main')
	t.is(mainMenu.name, 'main');
	t.truthy(mainMenu.sidebar.length);
});