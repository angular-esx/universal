"use strict";
// import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
var core_1 = require('@angular/core');
exports.BROWSER_ROUTER_PROVIDERS = [
    {
        provide: core_1.PLATFORM_INITIALIZER,
        useValue: function () {
            /* tslint:disable */
            console.warn('DEPRECATION WARNING: `BROWSER_ROUTER_PROVIDERS` is no longer supported for `angular2-universal` and will be removed in next release. Please use `ROUTER_PROVIDERS` from @angular/router');
            /* tslint:enable */
        },
        multi: true
    }
];
//# sourceMappingURL=router.js.map