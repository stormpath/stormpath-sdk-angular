/// <reference types="core-js" />
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Stormpath, RegistrationFormModel } from '../stormpath/stormpath.service';
export declare class RegisterComponent implements OnInit {
    stormpath: Stormpath;
    autoLogin: boolean;
    protected model: Object;
    private error;
    protected viewModel$: Observable<Object>;
    protected formModel: RegistrationFormModel;
    protected unverified: boolean;
    protected canLogin: boolean;
    protected registered: boolean;
    constructor(stormpath: Stormpath);
    ngOnInit(): void;
    register(): void;
    onSubmit(): void;
}
