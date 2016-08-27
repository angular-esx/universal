import { ComponentRef, Type, Provider } from '@angular/core';
export declare function prebootComplete(value?: any): any;
export declare function bootstrap(appComponentType: any, appProviders?: Array<Type | Provider | any | any[]>): Promise<ComponentRef<any>>;
