/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import axios, { AxiosInstance, AxiosRequestConfig} from "axios";
import TokenProvider from "../auth/tokenProvider";
import KanvasErrorAPI from "./KanvasErrorAPI";
import ClientOptions from "./clientOptions";

 export default class HttpClient {
   readonly http: AxiosInstance;
   readonly tokenProvider: TokenProvider;

   constructor(options: ClientOptions, tokenProvider: TokenProvider) {
    this.http = axios.create({
      baseURL: options.endpoint
    });
    this.tokenProvider = tokenProvider;
   }

   async request(config: AxiosRequestConfig, isAuthorized = true): Promise<any|KanvasErrorAPI> {
     if (!isAuthorized) {
       const headers = {
         Authorization: this.tokenProvider.getToken()
       }
       config.headers = Object.assign(config.headers, headers);
     }
     const { data } = await this.http.request(config).catch((error) => {
       throw new KanvasErrorAPI(error);
     })
     return data;
   }
 }
