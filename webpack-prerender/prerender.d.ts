import { PrebootOptions } from 'preboot';
export interface IUniversalPrerender {
    documentPath?: string;
    document?: string;
    DOCUMENT?: string;
    cancelHandler?: () => boolean;
    CANCEL_HANDLER?: () => boolean;
    req?: any;
    REQ?: any;
    res?: any;
    RES?: any;
    time?: boolean;
    TIME?: boolean;
    id?: string;
    ID?: string;
    ngModule?: any;
    precompile?: boolean;
    preboot?: PrebootOptions;
    cancel?: boolean;
    CANCEL?: boolean;
    requestUrl?: string;
    REQUEST_URL?: string;
    originUrl?: string;
    ORIGIN_URL?: string;
    baseUrl?: string;
    BASE_URL?: string;
    cookie?: string;
    COOKIE?: string;
}
export declare class UniversalPrerender {
    private _options;
    platformRef: any;
    constructor(_options: IUniversalPrerender);
    apply(compiler: any): void;
}