import { NgZone, ComponentRef, PlatformRef, ApplicationRef } from '@angular/core';
import './make_parse5_current';
export declare type ConfigRef = {
    componentRef: ComponentRef<any>;
    applicationRef: ApplicationRef;
};
export declare type ConfigRefs = Array<ConfigRef>;
export interface BootloaderConfig {
    template?: string;
    platformProviders?: Array<any>;
    providers?: Array<any>;
    componentProviders?: Array<any>;
    component?: any;
    directives?: Array<any>;
    preboot?: boolean | any;
    precache?: boolean;
    primeCache?: boolean;
    async?: boolean;
    prime?: boolean;
    beautify?: boolean;
    bootloader?: Bootloader | any;
    ngOnInit?: (config?: ConfigRefs, document?: any) => any | Promise<any> | ConfigRefs;
    ngOnStable?: (config?: ConfigRefs, document?: any) => any | Promise<any> | ConfigRefs;
    ngOnRendered?: (rendered?: string) => string | any | Promise<any>;
    ngDoCheck?: (config: ConfigRef, ngZone: NgZone) => boolean;
}
export interface AppConfig {
    template?: string;
    directives?: Array<any>;
    providers?: Array<any>;
}
export declare class Bootloader {
    private _config;
    platformRef: any;
    applicationRef: any;
    disposed: boolean;
    pending: boolean;
    pendingDisposed: boolean;
    constructor(config: BootloaderConfig);
    static create(config: any): Bootloader;
    static applicationRefToString(applicationRefs: any): string;
    static parseFragment(document: string): Object;
    static parseDocument(document: string): Object;
    static serializeDocument(document: Object): string;
    document(document?: string | Object): Object;
    platform(providers?: any): PlatformRef;
    application(document?: any, providers?: any): any;
    bootstrap(Component?: any | Array<any>): Promise<any>;
    serialize(Component?: any | Array<any>): Promise<any>;
    serializeApplication(config?: AppConfig | any, providers?: Array<any>): Promise<any> | any;
    _bootstrapAll(Components?: Array<any>, componentProviders?: Array<any>): Promise<Array<any>>;
    _applicationAll(config?: AppConfig): Promise<ConfigRefs>;
    _async(configRefs: ConfigRefs): Promise<ConfigRefs>;
    _preboot(configRefs: ConfigRefs): Promise<ConfigRefs>;
    dispose(): void;
    private _deprecated(config);
}
export declare function bootloader(config?: BootloaderConfig): Bootloader;
