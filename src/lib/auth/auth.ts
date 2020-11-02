/* eslint-disable functional/no-return-void */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import axios, { AxiosInstance } from 'axios';
import { EventEmitter } from 'tsee';

import ClientOptions from '../shared/clientOptions';

import TokenProvider from './tokenProvider';

type AuthEvents = {
  loggedIn: (token: string) => void,
  loggedOut: () => void
}


export default class Auth extends EventEmitter<AuthEvents>{
  http: AxiosInstance;
  tokenProvider: TokenProvider

  constructor(options: ClientOptions, tokenProvider: TokenProvider) {
    super()
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
    this.emit('loggedIn', data.token);
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
    this.emit('loggedOut')
  }

  getToken(): string|null {
    return this.tokenProvider.getToken();
  }
}
