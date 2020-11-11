/* eslint-disable functional/no-let */
import test from 'ava';
import config from '../../../config';
import Settings from './settings';

const settingsMap = {
	main: [
		'name',
		'description',
		'settings'
	],
	settings: [
		'allow_user_registration',
		'background_image',
		'base_color',
		'currency',
		'default_admin_role',
		'default_sidebar_state',
		'filesystem',
		'language',
		'logo',
		'public_images',
		'secondary_color',
		'show_notifications',
		'timezone',
		'user-settings'
	]
};

let settings: Settings;

test.beforeEach(async () => {
	settings = new Settings(
		{
			endpoint: config.apps.GEWAER_API,
			appKey: config.appkey
		}
	);
});

test.serial('settings fetch success', async(t) => {
	const data = await settings.fetch();
	const mainKeys = Object.keys(data);
	const settingsKeys = Object.keys(data.settings);

	settingsMap.main.forEach(key => {
		t.true(mainKeys.includes(key));
	});

	settingsMap.settings.forEach(key => {
		t.true(settingsKeys.includes(key));
	});
});