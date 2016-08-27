"use strict";
// Compiler
var compiler_1 = require('@angular/compiler');
// Animate
// import {BrowserDetails} from '@angular/platform-browser/src/animate/browser_details';
// import {AnimationBuilder} from '@angular/platform-browser/src/animate/animation_builder';
// Core
var testability_1 = require('@angular/core/src/testability/testability');
var reflection_capabilities_1 = require('@angular/core/src/reflection/reflection_capabilities');
var compiler_2 = require('@angular/compiler');
var core_1 = require('@angular/core');
// Common
var common_1 = require('@angular/common');
// Platform.Dom
var event_manager_1 = require('@angular/platform-browser/src/dom/events/event_manager');
var dom_events_1 = require('@angular/platform-browser/src/dom/events/dom_events');
var key_events_1 = require('@angular/platform-browser/src/dom/events/key_events');
var hammer_gestures_1 = require('@angular/platform-browser/src/dom/events/hammer_gestures');
// import {BROWSER_SANITIZATION_PROVIDERS} from'@angular/platform-browser'; // see provate below
var shared_styles_host_1 = require('@angular/platform-browser/src/dom/shared_styles_host');
var hammer_gestures_2 = require('@angular/platform-browser/src/dom/events/hammer_gestures');
var dom_tokens_1 = require('@angular/platform-browser/src/dom/dom_tokens');
var dom_renderer_1 = require('@angular/platform-browser/src/dom/dom_renderer');
var api_1 = require('@angular/core/src/render/api');
var template_parser_1 = require('@angular/compiler/src/template_parser');
var node_dom_renderer_1 = require('./dom/node_dom_renderer');
var node_xhr_impl_1 = require('./node_xhr_impl');
var node_shared_styles_host_1 = require('./node_shared_styles_host');
var node_template_parser_rc4_1 = require('./node_template_parser-rc4');
var node_template_parser_rc1_3_1 = require('./node_template_parser-rc1-3');
var node_template_parser_rc_0_1 = require('./node_template_parser-rc.0');
var directives_1 = require('../directives');
var node_platform_location_1 = require('../router/node_platform_location');
// should be Private
var web_animations_driver_1 = require('@angular/platform-browser/src/dom/web_animations_driver');
var reflection_1 = require('@angular/core/src/reflection/reflection');
var animation_driver_1 = require('@angular/core/src/animation/animation_driver');
var CONST_EXPR = function (v) { return v; };
require('../make_parse5_current'); // ensure Parse5DomAdapter is used
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var common_2 = require('../../common');
var _a = require('@angular/platform-browser'), ELEMENT_PROBE_PROVIDERS = _a.ELEMENT_PROBE_PROVIDERS, BROWSER_SANITIZATION_PROVIDERS = _a.BROWSER_SANITIZATION_PROVIDERS;
if (!ELEMENT_PROBE_PROVIDERS) {
    ELEMENT_PROBE_PROVIDERS = require('@angular/platform-browser/src/dom/debug/ng_probe').ELEMENT_PROBE_PROVIDERS;
}
var DOM = dom_adapter_1.getDOM();
var isRc0 = require('@angular/core/package.json').version.indexOf('-rc.0') !== -1;
var isRc4 = require('@angular/core/package.json').version.indexOf('-rc.4') !== -1;
function arrayFlattenTree(children, arr) {
    if (arr === void 0) { arr = []; }
    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
        var child = children_1[_i];
        if (Array.isArray(child)) {
            arrayFlattenTree(child, arr);
        }
        else {
            arr.push(child);
        }
    }
    return arr;
}
function initNodeAdapter() {
}
exports.initNodeAdapter = initNodeAdapter;
exports.NODE_APP_PLATFORM_MARKER = new core_1.OpaqueToken('NodeAppPlatformMarker');
exports.NODE_APP_PLATFORM = CONST_EXPR(core_1.PLATFORM_COMMON_PROVIDERS.concat([
    { provide: exports.NODE_APP_PLATFORM_MARKER, useValue: true },
    { provide: core_1.PLATFORM_INITIALIZER, useValue: initNodeAdapter, multi: true },
    { provide: common_1.PlatformLocation, useClass: node_platform_location_1.NodePlatformLocation }
]));
function _exceptionHandler() {
    return new core_1.ExceptionHandler(dom_adapter_1.getDOM(), false);
}
function _document() {
    return dom_adapter_1.getDOM().createHtmlDocument();
}
exports.NODE_APP_COMMON_PROVIDERS = CONST_EXPR(core_1.APPLICATION_COMMON_PROVIDERS.concat(common_1.FORM_PROVIDERS, BROWSER_SANITIZATION_PROVIDERS, [
    { provide: core_1.ExceptionHandler, useFactory: _exceptionHandler, deps: [] },
    { provide: core_1.PLATFORM_PIPES, useValue: common_1.COMMON_PIPES, multi: true },
    { provide: core_1.PLATFORM_DIRECTIVES, useValue: common_1.COMMON_DIRECTIVES, multi: true }
], directives_1.NODE_PLATFORM_DIRECTIVES, [
    { provide: dom_tokens_1.DOCUMENT, useFactory: function () { return _document; } },
    { provide: event_manager_1.EVENT_MANAGER_PLUGINS, useClass: dom_events_1.DomEventsPlugin, multi: true },
    { provide: event_manager_1.EVENT_MANAGER_PLUGINS, useClass: key_events_1.KeyEventsPlugin, multi: true },
    { provide: event_manager_1.EVENT_MANAGER_PLUGINS, useClass: hammer_gestures_1.HammerGesturesPlugin, multi: true },
    { provide: hammer_gestures_2.HAMMER_GESTURE_CONFIG, useClass: hammer_gestures_2.HammerGestureConfig },
    { provide: dom_renderer_1.DomRootRenderer, useClass: node_dom_renderer_1.NodeDomRootRenderer_ },
    { provide: api_1.RootRenderer, useExisting: dom_renderer_1.DomRootRenderer },
    { provide: shared_styles_host_1.SharedStylesHost, useExisting: node_shared_styles_host_1.NodeSharedStylesHost },
    { provide: shared_styles_host_1.DomSharedStylesHost, useExisting: node_shared_styles_host_1.NodeSharedStylesHost },
    { provide: animation_driver_1.AnimationDriver, useFactory: animation_driver_1.NoOpAnimationDriver },
    { provide: web_animations_driver_1.WebAnimationsDriver, useExisting: animation_driver_1.AnimationDriver },
    node_shared_styles_host_1.NodeSharedStylesHost,
    testability_1.Testability,
    // BrowserDetails,
    // AnimationBuilder,
    event_manager_1.EventManager
], (ELEMENT_PROBE_PROVIDERS || [])));
// console.log('\n NODE_APP_COMMON_PROVIDERS \n', arrayFlattenTree(NODE_APP_COMMON_PROVIDERS).map((provider, id, collection) => {
//   if (provider === undefined) {
//     console.log('provider undefined: ', collection[id-1], collection[id], collection[id+1])
//     return undefined;
//   }
//   let token = provider.provide || provider;
//   return (token.id || id) + ': ' + (token.name || token._desc);
// }));
/**
 * An array of providers that should be passed into `application()` when bootstrapping a component.
 */
var templateParser = isRc0 ? node_template_parser_rc_0_1.NodeTemplateParserRc0 : isRc4 ? node_template_parser_rc4_1.NodeTemplateParser : node_template_parser_rc1_3_1.NodeTemplateParserRc13;
exports.NODE_APP_PROVIDERS = CONST_EXPR(exports.NODE_APP_COMMON_PROVIDERS.concat(compiler_1.COMPILER_PROVIDERS, [
    {
        provide: compiler_2.CompilerConfig,
        useFactory: function (platformDirectives, platformPipes) {
            return new compiler_2.CompilerConfig({ platformDirectives: platformDirectives, platformPipes: platformPipes });
        },
        deps: [core_1.PLATFORM_DIRECTIVES, core_1.PLATFORM_PIPES]
    }
], (template_parser_1.TemplateParser ? [{ provide: template_parser_1.TemplateParser, useClass: templateParser }] : []), (compiler_1.XHR ? [{ provide: compiler_1.XHR, useClass: node_xhr_impl_1.NodeXHRImpl }] : [])));
// console.log('\n NODE_APP_PROVIDERS \n', arrayFlattenTree(NODE_APP_PROVIDERS).map((provider, id, collection) => {
//   if (provider === undefined) {
//     console.log('provider undefined: ', collection[id-1], collection[id], collection[id+1])
//     return undefined;
//   }
//   let token = provider.provide || provider;
//   if (token === undefined) {
//     console.log('provider token undefined: ', collection[id-1], collection[id], collection[id+1])
//     return undefined;
//   }
//   return (token.id || id) + ': ' + (token.name || token._desc);
// }));
/**
 *
 */
function bootstrap(appComponentType, customAppProviders, customComponentProviders) {
    if (customAppProviders === void 0) { customAppProviders = null; }
    if (customComponentProviders === void 0) { customComponentProviders = null; }
    buildReflector();
    var appProviders = exports.NODE_APP_PROVIDERS.concat([
        {
            provide: dom_tokens_1.DOCUMENT,
            useFactory: function (directiveResolver, sharedStylesHost) {
                // TODO(gdi2290): determine a better for document on the server
                var selector = directiveResolver.resolve(appComponentType);
                var serverDocument = DOM.createHtmlDocument();
                var el = DOM.createElement(selector);
                DOM.appendChild(serverDocument.body, el);
                sharedStylesHost.addHost(serverDocument.head);
                return serverDocument;
            },
            deps: [compiler_2.DirectiveResolver, node_shared_styles_host_1.NodeSharedStylesHost]
        }
    ], (common_2.isPresent(customAppProviders) ? customAppProviders : []));
    var componentProviders = (common_2.isPresent(customComponentProviders) ? customComponentProviders : []).slice();
    var platform = core_1.createPlatform(core_1.ReflectiveInjector.resolveAndCreate(exports.NODE_APP_PLATFORM));
    return core_1.coreLoadAndBootstrap(appComponentType, platform.injector);
}
exports.bootstrap = bootstrap;
function buildReflector() {
    reflection_1.reflector.reflectionCapabilities = new reflection_capabilities_1.ReflectionCapabilities();
}
exports.buildReflector = buildReflector;
function buildNodeProviders(providers) {
    return exports.NODE_APP_PLATFORM.concat((common_2.isPresent(providers) ? providers : []));
}
exports.buildNodeProviders = buildNodeProviders;
function buildNodeAppProviders(document, providers) {
    return exports.NODE_APP_PROVIDERS.concat([
        (common_2.isPresent(document) && document) ? [
            new core_1.Provider(dom_tokens_1.DOCUMENT, {
                useFactory: function (sharedStylesHost) {
                    sharedStylesHost.addHost(document.head);
                    return document;
                },
                deps: [node_shared_styles_host_1.NodeSharedStylesHost]
            })
        ] : []
    ], (common_2.isPresent(providers) && providers) ? providers : []);
}
exports.buildNodeAppProviders = buildNodeAppProviders;
function buildNodePlatformProviders(appComponentType, providers) {
    return exports.NODE_APP_PLATFORM.concat((common_2.isPresent(providers) ? providers : []));
}
exports.buildNodePlatformProviders = buildNodePlatformProviders;
//# sourceMappingURL=node.js.map