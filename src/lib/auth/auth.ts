/* eslint-disable functional/no-return-void */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import qs from 'qs';
import { EventEmitter } from 'tsee';
import ClientOptions from '../shared/clientOptions';
import HttpClient from '../shared/httpClient';
import TokenProvider from './tokenProvider';

type AuthEvents = {
	loggedIn: (token: string) => void;
	loggedOut: () => void;
};

type RegistrationForm = {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	default_company: string;
	verify_password: string;
};

export default class Auth extends EventEmitter<AuthEvents> {
	http: HttpClient;
	tokenProvider: TokenProvider;

	constructor(options: ClientOptions, tokenProvider: TokenProvider) {
		super();

		this.http = new HttpClient(options, tokenProvider);
		this.tokenProvider = tokenProvider;
	}

	async login(email: string, password: string): Promise<string> {
		const data = await this.http.request({
			url: `/auth`,
			method: 'POST',
			data: {
				email,
				password
			}
		});

		this.tokenProvider.setToken(data.token);
		this.emit('loggedIn', data.token);

		return data.token;
	}

	async logout(): Promise<void> {
		await this.http.request({
			url: 'auth/logout',
			method: 'PUT',
		});

		this.tokenProvider.removeToken();
		this.emit('loggedOut');
	}

	async register(formData: RegistrationForm): Promise<string> {
		const form = qs.stringify(formData);

		return this.http.request({
			url: `/users`,
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			data: form
		}).then((data) => {
			this.tokenProvider.setToken(data.session.token);
			this.emit('loggedIn', data.session.token);

			return data.session.token;
		});
	}

	async sendPasswordResetEmail(email: string): Promise<void> {
		return this.http.request({
			url: '/auth/forgot',
			method: 'POST',
			data: {
				email
			}
		});
	}

	resetPassword(
		newPassword: string,
		verifyPassword: string,
		code: string
	): Promise<void> {
		return this.http.request({
			url: `/auth/reset/${code}`,
			method: 'POST',
			data: {
				new_password: newPassword,
				verify_password: verifyPassword
			}
		});
	}

	getToken(): string | null {
		return this.tokenProvider.getToken();
	}
}