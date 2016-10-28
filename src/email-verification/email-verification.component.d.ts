import { OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Stormpath } from '../stormpath/stormpath.service';
export declare class EmailVerificationComponent implements OnInit {
    stormpath: Stormpath;
    location: Location;
    protected error: string;
    protected verifying: boolean;
    protected verified: boolean;
    protected verificationFailed: boolean;
    protected sptoken: string;
    constructor(stormpath: Stormpath, location: Location);
    ngOnInit(): void;
    spTokenResolver(): string;
    verify(): void;
}
