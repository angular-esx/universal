"use strict";
// Copied from @angular/core/facade/lang.ts
function isPresent(obj) {
    return obj !== undefined && obj !== null;
}
exports.isPresent = isPresent;
function isBlank(obj) {
    return obj === undefined || obj === null;
}
exports.isBlank = isBlank;
function regExFirstMatch(regExp, input) {
    regExp.lastIndex = 0;
    return regExp.exec(input);
}
exports.regExFirstMatch = regExFirstMatch;
// Copied from @angular/facade/src/collection.ts
exports.listContains = function (list, el) { return list.indexOf(el) !== -1; };
function stringMapForEach(map, callback) {
    for (var prop in map) {
        if (map.hasOwnProperty(prop)) {
            callback(map[prop], prop);
        }
    }
}
exports.stringMapForEach = stringMapForEach;
// Copied from @angular/http/src/http_utils.ts
exports.isSuccess = function (status) { return (status >= 200 && status < 300); };
//# sourceMappingURL=utils.js.map