"use strict";
// dom closure
require('./make_parse5_current'); // ensure Parse5DomAdapter is used
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var common_1 = require('../common');
var DOM = dom_adapter_1.getDOM();
var _singleTagWhitelist = ['br', 'hr', 'input'];
function stringifyElement(el) {
    var result = '';
    if (DOM.isElementNode(el)) {
        var tagName = DOM.tagName(el).toLowerCase();
        // Opening tag
        result += "<" + tagName;
        // Attributes in an ordered way
        var attributeMap = DOM.attributeMap(el);
        var keys = [];
        attributeMap.forEach(function (v, k) { keys.push(k); });
        keys.sort();
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var attValue = attributeMap.get(key);
            if (!(typeof attValue === 'string')) {
                result += " " + key;
            }
            else {
                result += " " + key + "=\"" + attValue + "\"";
            }
        }
        result += '>';
        // Children
        var children = DOM.childNodes(DOM.templateAwareRoot(el));
        for (var j = 0; j < children.length; j++) {
            result += stringifyElement(children[j]);
        }
        // Closing tag
        if (!common_1.listContains(_singleTagWhitelist, tagName)) {
            result += "</" + tagName + ">";
        }
    }
    else if (DOM.isCommentNode(el)) {
        result += "<!--" + DOM.nodeValue(el) + "-->";
    }
    else {
        result += DOM.getText(el);
    }
    return result;
}
exports.stringifyElement = stringifyElement;
//# sourceMappingURL=stringify_element.js.map