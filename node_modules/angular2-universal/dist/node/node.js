"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// dom closure
require('./make_parse5_current'); // ensure Parse5DomAdapter is used
var core_1 = require('@angular/core');
exports.Inject = core_1.Inject;
exports.Optional = core_1.Optional;
exports.enableProdMode = core_1.enableProdMode;
function provide(token, object) {
    object.provide = token;
    return object;
}
exports.provide = provide;
__export(require('./directives/index'));
__export(require('./http/index'));
__export(require('./pipes/index'));
__export(require('./platform/index'));
__export(require('./router/index'));
__export(require('./env'));
__export(require('./bootloader'));
__export(require('./helper'));
__export(require('./ng_preboot'));
__export(require('./render'));
__export(require('./stringify_element'));
__export(require('angular2-express-engine'));
__export(require('angular2-hapi-engine'));
//# sourceMappingURL=node.js.map