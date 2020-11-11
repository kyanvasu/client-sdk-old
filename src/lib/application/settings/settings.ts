/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import ClientOptions from '../../shared/clientOptions';
import HttpClient from '../../shared/httpClient';

type AppSettings = {
	name: string,
	description: string,
	settings: {
		allow_user_registration: boolean,
		background_image: string,
		base_color: string,
		currency: string,
		default_admin_role: string,
		default_sidebar_state: string,
		filesystem: string,
		language: string,
		logo: string,
		public_images: boolean,
		secondary_color: string,
		show_notifications: boolean,
		timezone: string,
		'user-settings': boolean
	}
}

export default class Settings {
	clientOptions: ClientOptions;
	http: HttpClient;

	constructor(options: ClientOptions) {
		this.clientOptions = options;
		this.http = new HttpClient(options);
	}

	async fetch(): Promise<AppSettings> {
		const data: AppSettings = await this.http.request({
			url: `/apps/${this.clientOptions.appKey}/settings`
		}, false);

		/* eslint-disable functional/immutable-data */
		data.settings.allow_user_registration = Boolean(Number(data.settings.allow_user_registration));
		data.settings.public_images = Boolean(Number(data.settings.public_images));
		data.settings.show_notifications = Boolean(Number(data.settings.show_notifications));
		data.settings['user-settings'] = Boolean(Number(data.settings['user-settings']));
		/* eslint-enable functional/immutable-data */

		return data;
	}
}