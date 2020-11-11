/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import TokenProvider from '../auth/tokenProvider';
import ClientOptions from '../shared/clientOptions';
import HttpClient from '../shared/httpClient';

type User = {
	id: number,
	email: string,
	firstname: string,
	lastname: string
}

export default class Users {
	data: User;
	http: HttpClient;
	tokenProvider: TokenProvider;

	constructor(options: ClientOptions, tokenProvider: TokenProvider) {
		this.http = new HttpClient(options, tokenProvider);
		this.tokenProvider = tokenProvider;
	}

	async changePassword(
		currentPassword: string,
		newPassword: string,
		confirmNewPassword: string
	): Promise<User> {
		const data = await this.http.request({
			url: `/users/${this.data.id}`,
			method: 'PUT',
			data: {
				confirm_new_password: confirmNewPassword,
				current_password: currentPassword,
				new_password: newPassword
			}
		});

		return data;
	}

	async getById(id = 0): Promise<User> {
		const data = await this.http.request({
			url: `/users/${id}?relationships=roles,photo`
		});

		// eslint-disable-next-line functional/immutable-data
		this.data = data;

		return data;
	}
}