/* eslint-disable functional/no-class */
/* eslint-disable functional/no-this-expression */
import { AxiosError } from 'axios';

type KanvasError = {
	readonly data: readonly any[];
	readonly type: string;
	readonly message: string;
};

class KanvasErrorAPI extends Error {
	readonly errors: KanvasError;
	readonly code: number | string;
	readonly status: number | string;
	readonly statusText: string;
	readonly original: AxiosError;

	constructor(error: AxiosError) {
		super();

		if (error.response) {
			this.status = error.response.status;
			this.statusText = error.response.statusText;
		}

		this.errors = error.response ? error.response.data.errors : {};
		this.original = error;
		this.code = error.code;
		this.message = error.message;
	}
}

export default KanvasErrorAPI;