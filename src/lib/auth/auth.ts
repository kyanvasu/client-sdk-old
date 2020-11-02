/* eslint-disable functional/no-return-void */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import axios, { AxiosInstance } from 'axios';
import { EventEmitter } from 'tsee';

import ClientOptions from '../shared/clientOptions';

type AuthEvents = {
  loggedIn: (token: string) => void,
  loggedOut: () => void
}


export default class Auth extends EventEmitter<AuthEvents>{
  http: AxiosInstance;

  constructor(options: ClientOptions) {
    super()
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
    this.emit('loggedIn', data.token);
    return data.token;
  }
}
