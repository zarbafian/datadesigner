import { Headers, BaseRequestOptions } from "@angular/http";

/**
 * This class overrides BaseRequestOptions to provide
 * credentials with each request to the server.
 */
export class AuthRequestOptions extends BaseRequestOptions {
   constructor() {
      super();
      this.withCredentials = true;
   }
}