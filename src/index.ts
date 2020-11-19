/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import Auth from "./lib/auth/auth";
import TokenProvider from "./lib/auth/tokenProvider";
import Menu from "./lib/menu/menu";
import ClientOptions from "./lib/shared/clientOptions";

export default class KanvasSDK {
	// Unauthenticated API
	public readonly auth: Auth;
	public readonly menu: Menu;
	public token: string;

	constructor(options: ClientOptions) {
		const tokenProvider = new TokenProvider({
			domain: options.domain
		});

		/**
		 * @todo Improve Dependency pattern
		 * @body Check if handle this in a better way. using IOC / DI.
		 */
		this.auth = new Auth(options, tokenProvider);
		this.menu = new Menu(options, tokenProvider);


		this.auth.on("loggedIn", (token) => {
			this.token = token;
		})

		this.auth.on("loggedOut", () => {
			this.token = null;
		})
	}
}