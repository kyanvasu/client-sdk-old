/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-class */
// eslint-disable functional/prefer-readonly-type
import Cookie from "js-cookie";

export default class TokenProvider {
  setToken(token: string): void{
    if (token) {
      Cookie.set("Kanvas:token", token)
    }
  }

  removeToken(): void {
    Cookie.remove("Kanvas:token")
  }

  getToken(): string|null {
    return Cookie.get("Kanvas:token") || null
  }
}
