import { OnInit } from '@angular/core';
import { Stormpath, LoginService } from '../stormpath/stormpath.service';
export declare class AuthPortComponent implements OnInit {
    stormpath: Stormpath;
    loginService: LoginService;
    private user$;
    private loggedIn$;
    private login;
    private register;
    protected forgot: boolean;
    constructor(stormpath: Stormpath, loginService: LoginService);
    ngOnInit(): void;
    showLogin(): void;
    showRegister(): void;
    forgotPassword(): void;
    flip(a: boolean, b: boolean): void;
    logout(): void;
}
