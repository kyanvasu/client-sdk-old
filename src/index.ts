
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import Auth from "./lib/auth/auth";
import TokenProvider from "./lib/auth/tokenProvider";
import ClientOptions from "./lib/shared/clientOptions";

export default class Client {
  // Unauthenticated API
  public readonly auth: Auth;

  constructor(options: ClientOptions) {
    const tokenProvider = new TokenProvider();
    this.auth = new Auth(options, tokenProvider);
  }
}
