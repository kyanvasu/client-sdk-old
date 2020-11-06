/* eslint-disable functional/no-class */
/* eslint-disable functional/no-this-expression */
import { AxiosError } from "axios";

type KanvasError = {
  readonly data: readonly any[],
  readonly type: string,
  readonly message: string
}

class KanvasErrorAPI extends Error {
  readonly errors: KanvasError;
  readonly code: number|string;

  constructor(error: AxiosError) {
    super();
    this.errors = error.response.data.errors;
    this.code = error.code;
    this.message = error.message;
  }
};
export default KanvasErrorAPI;
