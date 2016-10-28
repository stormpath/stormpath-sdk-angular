import { OnInit } from '@angular/core';
import { Stormpath, ResendEmailVerificationRequest } from '../stormpath/stormpath.service';
export declare class ResendEmailVerificationComponent implements OnInit {
    stormpath: Stormpath;
    protected error: string;
    protected formModel: ResendEmailVerificationRequest;
    protected posting: boolean;
    protected sent: boolean;
    constructor(stormpath: Stormpath);
    ngOnInit(): void;
    send(): void;
    onSubmit(): void;
}
