import { OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Stormpath, PasswordResetRequest } from '../stormpath/stormpath.service';
export declare class ResetPasswordComponent implements OnInit {
    stormpath: Stormpath;
    location: Location;
    protected disabled: boolean;
    protected error: string;
    protected formModel: PasswordResetRequest;
    protected posting: boolean;
    protected reset: boolean;
    protected verifying: boolean;
    protected verified: boolean;
    protected verificationFailed: boolean;
    protected sptoken: string;
    constructor(stormpath: Stormpath, location: Location);
    ngOnInit(): void;
    spTokenResolver(): string;
    verify(): void;
    send(): void;
    onSubmit(): void;
}
