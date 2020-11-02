/* eslint-disable functional/prefer-readonly-type */

/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import Auth from "./lib/auth/auth";
import TokenProvider from "./lib/auth/tokenProvider";
import ClientOptions from "./lib/shared/clientOptions";

export default class Client {
  // Unauthenticated API
  public readonly auth: Auth;
  public token: string;

  constructor(options: ClientOptions) {
    const tokenProvider = new TokenProvider({
      domain: options.domain
    });
    this.auth = new Auth(options, tokenProvider);

    this.auth.on("loggedIn", (token) => {
      this.token = token
    })

    this.auth.on("loggedOut", () => {
      this.token = null
    })
  }
}
