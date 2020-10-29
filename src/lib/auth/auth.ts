/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import axios, { AxiosInstance } from 'axios';

import ClientOptions from '../shared/clientOptions';

export default class Auth {
  http: AxiosInstance;

  constructor(options: ClientOptions) {
    this.http = axios.create({
      baseURL: options.endpoint
    });
  }

  login(email: string, password: string): Promise<string> {
    return this.http({
      url: `/auth`,
      method: 'POST',
      data: {
        email,
        password,
      },
    }).then(async ({ data }) => {
      return data.token
    });
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    await this.http({
      url: '/auth/forgot',
      method: 'POST',
      data: {
        email
      }
    })
  }
}
