/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-class */
// eslint-disable functional/prefer-readonly-type
import Cookie from "js-cookie";

export default class TokenProvider {
  readonly config: Cookie.CookieAttributes;

  constructor(config: Cookie.CookieAttributes) {
    this.config = config
  }

  setToken(token: string, config?: Cookie.CookieAttributes ): void{
    if (token) {
      const expires = config && config.expires ? new Date(config.expires) : null;
      console.log('hi')
      Cookie.set("token", token, {expires, path: "/", domain: this.config.domain });
    }
  }

  removeToken(): void {
    Cookie.remove("token", { path: "/", domain: this.config.domain })
  }

  getToken(): string|null {
    return Cookie.get("token") || null
  }
}
