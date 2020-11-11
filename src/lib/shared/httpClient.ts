/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import TokenProvider from '../auth/tokenProvider';
import KanvasErrorAPI from './KanvasErrorAPI';
import ClientOptions from './clientOptions';

export default class HttpClient {
	readonly http: AxiosInstance;
	readonly tokenProvider: TokenProvider;

	constructor(options: ClientOptions, tokenProvider?: TokenProvider) {
		this.http = axios.create({
			baseURL: options.endpoint,
		});
		this.tokenProvider = tokenProvider;
	}

	async request(config: AxiosRequestConfig, isAuthorized = true): Promise<any> {
		const requestConfig = this.getRequestConfig(config, isAuthorized);
		const { data } = await this.http.request(requestConfig).catch((error) => {
			throw new KanvasErrorAPI(error);
		});

		return data;
	}

	getRequestConfig(
		config: AxiosRequestConfig,
		isAuthorized: boolean
	): AxiosRequestConfig {
		if (isAuthorized) {
			const token = this.tokenProvider.getToken();
			const userHeaders = config.headers || {};
			const headers = {
				Authorization: token
			};
			config.headers = Object.assign(userHeaders, headers);
		}

		return config;
	}
}