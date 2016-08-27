import { Connection, ConnectionBackend, ReadyState, Request, Response, ResponseOptions } from '@angular/http';
import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Cookie } from '../../common';
export declare class NodeConnection implements Connection {
    readyState: ReadyState;
    request: Request;
    response: Observable<Response> | Observable<any>;
    constructor(req: Request, baseResponseOptions: ResponseOptions, ngZone: NgZone, originUrl?: string, baseUrl?: string, cookie?: Cookie, cookieKey?: any);
}
export declare class NodeBackend implements ConnectionBackend {
    private _baseResponseOptions;
    private _ngZone;
    private _baseUrl;
    private _originUrl;
    constructor(_baseResponseOptions: ResponseOptions, _ngZone: NgZone, _baseUrl: string, _originUrl: string);
    createConnection(request: Request): NodeConnection;
}
export declare class NodeJsonpBackend implements ConnectionBackend {
    private _baseResponseOptions;
    private _ngZone;
    private _baseUrl;
    private _originUrl;
    constructor(_baseResponseOptions: ResponseOptions, _ngZone: NgZone, _baseUrl: string, _originUrl: string);
    createConnection(request: Request): NodeConnection;
}
