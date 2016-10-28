import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Account } from '../shared/account';
import { Stormpath, LoginFormModel, LoginService } from '../stormpath/stormpath.service';
export declare class LoginComponent implements OnInit {
    stormpath: Stormpath;
    loginService: LoginService;
    protected loginFormModel: LoginFormModel;
    protected user$: Observable<Account | boolean>;
    protected loggedIn$: Observable<boolean>;
    protected error: string;
    constructor(stormpath: Stormpath, loginService: LoginService);
    ngOnInit(): void;
    login(): void;
    forgot(): void;
}
