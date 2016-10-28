import { OnInit } from '@angular/core';
import { Stormpath, ForgotPasswordFormModel } from '../stormpath/stormpath.service';
export declare class ForgotPasswordComponent implements OnInit {
    stormpath: Stormpath;
    protected forgotPasswordFormModel: ForgotPasswordFormModel;
    protected error: string;
    protected sent: boolean;
    constructor(stormpath: Stormpath);
    ngOnInit(): void;
    send(): void;
    onSubmit(): void;
}
