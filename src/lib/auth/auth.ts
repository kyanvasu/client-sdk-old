/* eslint-disable functional/immutable-data */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import axios, { AxiosInstance } from 'axios';

import ClientOptions from '../shared/clientOptions';

export default class Auth {
  http: AxiosInstance;
  token: string

  constructor(options: ClientOptions) {
    this.http = axios.create({
      baseURL: options.endpoint
    });
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
    this.token = data.token
    return data.token;
  }

  async logout(): Promise<void> {
    await this.http({
      url: 'auth/logout',
      method: 'PUT',
      headers: {
        Authorization: this.token
      }
    });
    this.token = null;
  }
}
