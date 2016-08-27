"use strict";
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
exports.BROWSER_HTTP_PROVIDERS = [
    {
        provide: core_1.PLATFORM_INITIALIZER,
        useValue: function () {
            /* tslint:disable */
            console.warn('DEPRECATION WARNING: `BROWSER_HTTP_PROVIDERS` is no longer supported for `angular2-universal` and will be removed in next release. Please use `HTTP_PROVIDERS` from @angular/http');
            /* tslint:enable */
        },
        multi: true
    }
].concat(http_1.HTTP_PROVIDERS);
exports.BROWSER_JSONP_PROVIDERS = [
    {
        provide: core_1.PLATFORM_INITIALIZER,
        useValue: function () {
            /* tslint:disable */
            console.warn('DEPRECATION WARNING: `BROWSER_JSONP_PROVIDERS` is no longer supported for `angular2-universal` and will be removed in next release. Please use `JSONP_PROVIDERS` from @angular/http');
            /* tslint:enable */
        },
        multi: true
    },
    http_1.JSONP_PROVIDERS
];
//# sourceMappingURL=http.js.map