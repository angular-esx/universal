"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
// import {ROUTER_PROVIDERS_COMMON} from '@angular/router-deprecated';
var node_platform_location_1 = require('./node_platform_location');
__export(require('./node_platform_location'));
exports.NODE_LOCATION_PROVIDERS = [
    { provide: common_1.PlatformLocation, useClass: node_platform_location_1.NodePlatformLocation }
];
exports.NODE_ROUTER_PROVIDERS = [
    {
        provide: core_1.PLATFORM_INITIALIZER,
        useValue: function () {
            /* tslint:disable */
            console.warn('DEPRECATION WARNING: `NODE_ROUTER_PROVIDERS` is no longer supported for `angular2-universal` and will be removed in next release. Please use `NODE_LOCATION_PROVIDERS` from angular2-universal and `ROUTER_PROVIDERS` from @angular/router');
            /* tslint:enable */
        },
        multi: true
    }
].concat(exports.NODE_LOCATION_PROVIDERS);
//# sourceMappingURL=index.js.map