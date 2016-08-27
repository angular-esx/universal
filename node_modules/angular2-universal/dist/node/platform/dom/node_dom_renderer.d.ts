import { Renderer, RenderComponentType } from '@angular/core';
import { DomRenderer, DomRootRenderer } from '@angular/platform-browser/src/dom/dom_renderer';
import { WebAnimationsDriver } from '@angular/platform-browser/src/dom/web_animations_driver';
import { EventManager } from '@angular/platform-browser/src/dom/events/event_manager';
import { DomSharedStylesHost } from '@angular/platform-browser/src/dom/shared_styles_host';
import '../../make_parse5_current';
export declare class NodeDomRootRenderer_ extends DomRootRenderer {
    private _animate;
    constructor(_document: any, _eventManager: EventManager, sharedStylesHost: DomSharedStylesHost, _animate: WebAnimationsDriver);
    renderComponent(componentProto: RenderComponentType): Renderer;
}
export declare const ATTRIBUTES: {
    textarea: string[];
    script: string[];
    button: string[];
    fieldset: string[];
    a: string[];
    img: string[];
    input: string[];
    output: string[];
    progress: string[];
    label: string[];
    option: string[];
    select: string[];
    optgroup: string[];
    form: string[];
};
export declare const IGNORE_ATTRIBUTES: {
    'innerHTML': boolean;
};
export declare class NodeDomRenderer extends DomRenderer {
    constructor(_rootRenderer: DomRootRenderer | any, _componentProto: RenderComponentType, _animate: WebAnimationsDriver);
    setElementProperty(renderElement: any, propertyName: string, propertyValue: any): void;
    setElementStyle(renderElement: any, styleName: string, styleValue: string): void;
    invokeElementMethod(renderElement: any, methodName: string, args: any[]): void;
    _setCheckedAttribute(renderElement: any, propertyName: any, propertyValue: any): void;
    _setOnOffAttribute(renderElement: any, propertyName: any, propertyValue: any): void;
    _setBooleanAttribute(renderElement: any, propertyName: any, propertyValue: any): void;
}
