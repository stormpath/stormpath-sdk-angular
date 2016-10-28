/// <reference types="core-js" />
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { ReplaySubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/throw';
import { Account } from '../shared/account';
export declare function defaultSpTokenResolver(location: Location): string;
export interface RegistrationFormModel {
    email?: string;
    surname?: string;
    givenName?: string;
    password?: string;
    [propName: string]: any;
}
export interface ForgotPasswordFormModel {
    email: string;
    accountStore?: Object;
    organizationNameKey?: string;
}
export interface ResendEmailVerificationRequest {
    login: string;
    accountStore?: Object;
    organizationNameKey?: string;
}
export interface PasswordResetRequest {
    accountStore?: Object;
    organizationNameKey?: string;
    password: string;
    sptoken: string;
}
export interface LoginFormModel {
    login: string;
    password: string;
    accountStore?: Object;
    organizationNameKey?: string;
}
export interface StormpathErrorResponse {
    status: number;
    message: string;
}
export declare class LoginService {
    forgot: boolean;
    login: boolean;
    register: boolean;
    constructor();
    forgotPassword(): void;
}
export declare class Stormpath {
    http: Http;
    user$: Observable<Account | boolean>;
    userSource: ReplaySubject<Account | boolean>;
    constructor(http: Http);
    /**
     * Attempts to get the current user by making a request of the /me endpoint.
     *
     * @return {Observable<Account | boolean>}
     * An observable that will return an Account if the user is logged in, or false
     * if the user is not logged in.
     */
    getAccount(): Observable<Account | boolean>;
    getRegistrationViewModel(): Observable<any>;
    /**
     * Attempts to register a new account by making a POST request to the
     * /register endpoint.
     *
     * @return {Observable<Account>}
     * An observable that will return an Account if the POST was successful.
     */
    register(form: Object): Observable<Account>;
    login(form: LoginFormModel): Observable<any>;
    logout(): void;
    resendVerificationEmail(request: ResendEmailVerificationRequest): Observable<any>;
    sendPasswordResetEmail(form: ForgotPasswordFormModel): Observable<any>;
    resetPassword(form: PasswordResetRequest): Observable<any>;
    verifyEmailVerificationToken(sptoken: string): Observable<any>;
    verifyPasswordResetToken(sptoken: string): Observable<any>;
    /**
     * Returns the JSON error from an HTTP response, or a generic error if the
     * response is not a JSON error
     * @param {any} error
     */
    private errorTranslator(error);
    private errorThrower(error);
    private accountTransformer(json);
    private jsonParser(res);
}
