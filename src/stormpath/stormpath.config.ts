import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

export class StormpathConstants {
  public static readonly VERSION: string = '${VERSION}'; // This value will be overwritten by webpack

  /**
   * Default: `/login`
   *
   * The URI that the login form will post to.  The endpoint MUST accept data
   * in the following format:
   *
   * ```
   * {
    *     username: '',
    *     password: ''
    * }
   * ```
   */
  public static readonly AUTHENTICATION_ENDPOINT: string = '/login';

  /**
   * Default: `/oauth/token`
   *
   * The endpoint that is used to authenticate and refresh using OAuth tokens.
   * This endpoint MUST support password and refresh_token grant authentication flows.
   */
  public static readonly OAUTH_AUTHENTICATION_ENDPOINT: string = '/oauth/token';

  /**
   * Default: 'stormpath:token'
   *
   * The name under which tokens are stored in the token storage mechanism.
   * Might not be relevant if the underlying storage mechanism is not key-value based.
   */
  public static readonly OAUTH_TOKEN_STORAGE_NAME: string = 'stormpath:token';

  public static readonly OAUTH_HEADERS: Headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  });

  /**
   * Default: `/me`
   *
   * The URI that is used to fetch the account object of
   * the currently logged in user.  This endpoint MUST:
   *  * Respond with a JSON object that is the Stormpath account object,
   *  if the user has an active session.
   *  * Respond with `401 Unauthorized` if the user has no session.
   */
  public static readonly CURRENT_USER_URI: string = '/me';

  /**
   * Default: `/logout`
   *
   * The URL that the logout action will make a GET request to, this endpoint
   * MUST delete the access token cookie, XSRF token cookie, and any other cookies
   * that relate to the user session.
   */
  public static readonly DESTROY_SESSION_ENDPOINT: string = '/logout';

  /**
   * Default: `/oauth/revoke`
   *
   * The endpoint that is used to revoke OAuth tokens.
   */
  public static readonly OAUTH_REVOKE_ENDPOINT: string = '/oauth/revoke';

  /**
   * Default: `/verify`
   *
   * The endpoint that is used for verifying an account that requires email
   * verification.
   *
   * This endpoint MUST accept a POST request with the following format and
   * use Stormpath to verify the token:
   * ```
   * {
    *   sptoken: '<token from email sent to user>'
    * }
   * ```
   *
   */
  public static readonly EMAIL_VERIFICATION_ENDPOINT: string = '/verify';

  /**
   * Default: `/forgot`
   *
   * The endpoint that is used by to create password reset tokens.
   */
  public static readonly FORGOT_PASSWORD_ENDPOINT: string = '/forgot';

  /**
   * Default: `/change`
   *
   * The endpoint that is used to verify and consume password reset tokens
   * (change a user's password with the token).
   */
  public static readonly CHANGE_PASSWORD_ENDPOINT: string = '/change';

  /**
   * Default: `/register`
   *
   * The endpoint that is used to POST new users.  This endpoint MUST accept a
   * stormpath account object and use Stormpath to create the new user.
   */
  public static readonly REGISTER_URI: string = '/register';

  /**
   * Default: *none*
   *
   * A prefix, e.g. "base URL" to add to all endpoints that are used by this SDK.
   * Use this if your backend API is running on a different port or domain than
   * your Angular application.  Omit the trailing forward slash.
   *
   * **NOTE:** This may trigger
   * [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)
   * behaviour in the browser, and your server
   * will need to respond to requests accordingly.  If you are using our
   * Express SDK see
   * [allowedOrigins](https://github.com/stormpath/stormpath-sdk-express#allowedOrigins)
   *
   * **Example:**
   * <pre>
   *   ENDPOINT_PREFIX = 'http://api.mydomain.com'
   * </pre>
   */
  public static readonly ENDPOINT_PREFIX: string = '';
}

@Injectable()
export class StormpathConfiguration {
  private _changeUri: string;
  private _forgotUri: string;
  private _loginUri: string;
  private _logoutUri: string;
  private _oauthLoginUri: string;
  private _oauthLogoutUri: string;
  private _oauthTokenName: string;
  private _meUri: string;
  private _registerUri: string;
  private _verifyUri: string;
  private _endpointPrefix: string;
  private _version: string;

  constructor() {
    this._changeUri = StormpathConstants.CHANGE_PASSWORD_ENDPOINT;
    this._forgotUri = StormpathConstants.FORGOT_PASSWORD_ENDPOINT;
    this._loginUri = StormpathConstants.AUTHENTICATION_ENDPOINT;
    this._logoutUri = StormpathConstants.DESTROY_SESSION_ENDPOINT;
    this._oauthLoginUri = StormpathConstants.OAUTH_AUTHENTICATION_ENDPOINT;
    this._oauthLogoutUri = StormpathConstants.OAUTH_REVOKE_ENDPOINT;
    this._oauthTokenName = StormpathConstants.OAUTH_TOKEN_STORAGE_NAME;
    this._meUri = StormpathConstants.CURRENT_USER_URI;
    this._registerUri = StormpathConstants.REGISTER_URI;
    this._verifyUri = StormpathConstants.EMAIL_VERIFICATION_ENDPOINT;
    this._endpointPrefix = StormpathConstants.ENDPOINT_PREFIX;
    this._version = StormpathConstants.VERSION;
  }

  /**
   * Return a list of all available URIs. This list is used to decide whether
   * X-Stormpath-Agent is sent as a header or not.
   *
   * @returns {[string]} Array of all Stormpath endpoints, in alphabetical order.
   */
  get endpointUris(): Array<string> {
    return [this.changeUri, this.forgotUri, this.loginUri, this.logoutUri, this.meUri, this.registerUri, this.verifyUri];
  }

  get changeUri(): string {
    return this._endpointPrefix + this._changeUri;
  }

  set changeUri(value: string) {
    this._changeUri = value;
  }

  get forgotUri(): string {
    return this._endpointPrefix + this._forgotUri;
  }

  set forgotUri(value: string) {
    this._forgotUri = value;
  }

  get loginUri(): string {
    return this._endpointPrefix + this._loginUri;
  }

  set loginUri(value: string) {
    this._loginUri = value;
  }

  get logoutUri(): string {
    return this._endpointPrefix + this._logoutUri;
  }

  set logoutUri(value: string) {
    this._logoutUri = value;
  }

  get oauthLoginUri(): string {
    return this._endpointPrefix + this._oauthLoginUri;
  }

  set oauthLoginUri(value: string) {
    this._oauthLoginUri = value;
  }

  get oauthLogoutUri(): string {
    return this._endpointPrefix + this._oauthLogoutUri;
  }

  set oauthLogoutUri(value: string) {
    this._oauthLogoutUri = value;
  }

  get oauthTokenName(): string {
    return this._oauthTokenName;
  }

  set oauthTokenName(value: string) {
    this._oauthTokenName = value;
  }

  get meUri(): string {
    return this._endpointPrefix + this._meUri;
  }

  set meUri(value: string) {
    this._meUri = value;
  }

  get registerUri(): string {
    return this._endpointPrefix + this._registerUri;
  }

  set registerUri(value: string) {
    this._registerUri = value;
  }

  get verifyUri(): string {
    return this._endpointPrefix + this._verifyUri;
  }

  set verifyUri(value: string) {
    this._verifyUri = value;
  }

  get endpointPrefix(): string {
    return this._endpointPrefix;
  }

  set endpointPrefix(value: string) {
    this._endpointPrefix = value;
  }

  get version(): string {
    return this._version;
  }
}
