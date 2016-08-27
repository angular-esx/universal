"use strict";
var node_1 = require('./platform/node');
var platform_browser_1 = require('@angular/platform-browser');
var document_1 = require('./platform/document');
var stringify_element_1 = require('./stringify_element');
var ng_preboot_1 = require('./ng_preboot');
var shared_styles_host_1 = require('@angular/platform-browser/src/dom/shared_styles_host');
var core_1 = require('@angular/core');
// import {Router} from '@angular/router-deprecated';
var common_1 = require('../common');
// export function waitRouter(appRef: ComponentRef<any>): Promise<ComponentRef<any>> {
//   let injector = appRef.injector;
//   let router = injector.get(Router, Router);
//
//   return Promise.resolve(router && router._currentNavigation)
//     .then(() => new Promise(resolve => setTimeout(() => resolve(appRef))));
// }
function renderDocument(documentHtml, componentType, nodeProviders) {
    console.warn('DEPRECATION WARNING: `renderDocument` is no longer supported and will be removed in next release.');
    return node_1.bootstrap(componentType, nodeProviders.concat([
        new core_1.Provider(platform_browser_1.DOCUMENT, { useValue: document_1.parseDocument(documentHtml) })
    ]))
        .then(function (appRef) {
        var injector = appRef.injector;
        var document = injector.get(platform_browser_1.DOCUMENT);
        return document_1.serializeDocument(document);
    });
}
exports.renderDocument = renderDocument;
function renderDocumentWithPreboot(documentHtml, componentType, nodeProviders, prebootConfig) {
    if (prebootConfig === void 0) { prebootConfig = {}; }
    console.warn('DEPRECATION WARNING: `renderDocumentWithPreboot` is no longer supported and will be removed in next release.');
    return renderDocument(documentHtml, componentType, nodeProviders)
        .then(function (html) { return ng_preboot_1.createPrebootCode(componentType, prebootConfig).then(function (code) { return html + code; }); });
}
exports.renderDocumentWithPreboot = renderDocumentWithPreboot;
function serializeApplication(element, styles, cache) {
    console.warn('DEPRECATION WARNING: `serializeApplication` is no longer supported and will be removed in next release.');
    // serialize all style hosts
    var serializedStyleHosts = styles.length >= 1 ? '<style>' + styles.join('\n') + '</style>' : '';
    // serialize Top Level Component
    var serializedCmp = stringify_element_1.stringifyElement(element);
    // serialize App Data
    var serializedData = common_1.isBlank(cache) ? '' : '' +
        '<script>' +
        'window.' + 'ngPreloadCache' + ' = ' + JSON.stringify(cache, null, 2) +
        '</script>' +
        '';
    return serializedStyleHosts + serializedCmp + serializedData;
}
exports.serializeApplication = serializeApplication;
function appRefSyncRender(appRef) {
    console.warn('DEPRECATION WARNING: `appRefSyncRender` is no longer supported and will be removed in next release.');
    // grab parse5 html element
    var element = appRef.location.nativeElement;
    // TODO: we need a better way to manage the style host for server/client
    var sharedStylesHost = appRef.injector.get(shared_styles_host_1.SharedStylesHost);
    var styles = sharedStylesHost.getAllStyles();
    var serializedApp = serializeApplication(element, styles);
    return serializedApp;
}
exports.appRefSyncRender = appRefSyncRender;
function applicationToString(appRef) {
    console.warn('DEPRECATION WARNING: `applicationToString` is no longer supported and will be removed in next release.');
    var html = appRefSyncRender(appRef);
    appRef.destroy();
    return html;
}
exports.applicationToString = applicationToString;
function renderToString(componentType, nodeProviders) {
    console.warn('DEPRECATION WARNING: `renderToString` is no longer supported and will be removed in next release.');
    return node_1.bootstrap(componentType, nodeProviders)
        .then(applicationToString);
}
exports.renderToString = renderToString;
function renderToStringWithPreboot(componentType, nodeProviders, prebootConfig) {
    if (prebootConfig === void 0) { prebootConfig = {}; }
    console.warn('DEPRECATION WARNING: `renderToStringWithPreboot` is no longer supported and will be removed in next release.');
    return renderToString(componentType, nodeProviders)
        .then(function (html) { return ng_preboot_1.createPrebootCode(componentType, prebootConfig).then(function (code) { return html + code; }); });
}
exports.renderToStringWithPreboot = renderToStringWithPreboot;
//# sourceMappingURL=render.js.map