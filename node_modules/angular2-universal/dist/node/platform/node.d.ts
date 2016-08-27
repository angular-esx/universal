import { ComponentRef, OpaqueToken, Type } from '@angular/core';
import '../make_parse5_current';
export declare function initNodeAdapter(): void;
export declare const NODE_APP_PLATFORM_MARKER: OpaqueToken;
export declare const NODE_APP_PLATFORM: Array<any>;
export declare const NODE_APP_COMMON_PROVIDERS: Array<any>;
export declare const NODE_APP_PROVIDERS: Array<any>;
/**
 *
 */
export declare function bootstrap(appComponentType: Type, customAppProviders?: Array<any>, customComponentProviders?: Array<any>): Promise<ComponentRef<any>>;
export declare function buildReflector(): void;
export declare function buildNodeProviders(providers?: Array<any>): Array<any>;
export declare function buildNodeAppProviders(document?: any, providers?: Array<any>): Array<any>;
export declare function buildNodePlatformProviders(appComponentType: Type, providers?: Array<any>): Array<any>;
