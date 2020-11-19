/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import TokenProvider from '../auth/tokenProvider';
import ClientOptions from './clientOptions';
import HttpClient from './httpClient';

export default class BaseResource {
	http: HttpClient;
	tokenProvider: TokenProvider;

	constructor(options: ClientOptions, tokenProvider: TokenProvider) {
		this.http = new HttpClient(options, tokenProvider);
		this.tokenProvider = tokenProvider;
	}
}