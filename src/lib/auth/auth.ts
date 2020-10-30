/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import axios, { AxiosInstance } from 'axios';

import ClientOptions from '../shared/clientOptions';

import TokenProvider from './tokenProvider';

export default class Auth {
  http: AxiosInstance;
  tokenProvider: TokenProvider

  constructor(options: ClientOptions, tokenProvider: TokenProvider) {
    this.http = axios.create({
      baseURL: options.endpoint
    });

    this.tokenProvider = tokenProvider
  }

  async login(email: string, password: string): Promise<string> {
    const { data } = await this.http({
      url: `/auth`,
      method: 'POST',
      data: {
        email,
        password,
      },
    });
    this.tokenProvider.setToken(data.token);
    return data.token;
  }

  async logout(): Promise<void> {
    await this.http({
      url: 'auth/logout',
      method: 'PUT',
      headers: {
        Authorization: this.tokenProvider.getToken()
      }
    });

    this.tokenProvider.removeToken();
  }

  getToken(): string|null {
    return this.tokenProvider.getToken();
  }
}
