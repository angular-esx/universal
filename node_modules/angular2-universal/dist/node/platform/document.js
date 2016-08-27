"use strict";
var parse5_1 = require('parse5');
require('../make_parse5_current'); // ensure Parse5DomAdapter is used
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var DOM = dom_adapter_1.getDOM();
var parser = new parse5_1.Parser(parse5_1.TreeAdapters.htmlparser2);
// TODO(gdi2290): fix encodeHtmlEntities: true
var serializer = new parse5_1.Serializer(parse5_1.TreeAdapters.htmlparser2, { encodeHtmlEntities: true });
var treeAdapter = parser.treeAdapter;
function isTag(tagName, node) {
    return node.type === 'tag' && node.name === tagName;
}
exports.isTag = isTag;
function parseFragment(el) {
    return parser.parseFragment(el);
}
exports.parseFragment = parseFragment;
function parseDocument(documentHtml) {
    if (!documentHtml) {
        throw new Error('parseDocument requires a document string');
    }
    if (typeof documentHtml !== 'string') {
        throw new Error('parseDocument needs to be a string to be parsed correctly');
    }
    var doc = parser.parse(documentHtml);
    /*
    // Build entire doc <!doctype><html> etc
    if (documentHtml.indexOf('<html>') > -1 && documentHtml.indexOf('</html>') > -1) {
      const doc = parser.parse(documentHtml);
    }
    // ASP.NET case : parse only the fragment - don't build entire <html> doc
    const doc = parser.parseFragment(documentHtml);
    */
    var rootNode;
    var bodyNode;
    var headNode;
    var titleNode;
    for (var i = 0; i < doc.children.length; ++i) {
        var child = doc.children[i];
        if (isTag('html', child)) {
            rootNode = child;
            break;
        }
    }
    if (!rootNode) {
        rootNode = doc;
    }
    for (var i = 0; i < rootNode.children.length; ++i) {
        var child = rootNode.children[i];
        if (isTag('head', child)) {
            headNode = child;
        }
        if (isTag('body', child)) {
            bodyNode = child;
        }
    }
    if (!headNode) {
        headNode = treeAdapter.createElement('head', null, []);
        DOM.appendChild(doc, headNode);
    }
    if (!bodyNode) {
        bodyNode = treeAdapter.createElement('body', null, []);
        DOM.appendChild(doc, bodyNode);
    }
    for (var i = 0; i < headNode.children.length; ++i) {
        if (isTag('title', headNode.children[i])) {
            titleNode = headNode.children[i];
            break;
        }
    }
    if (!titleNode) {
        titleNode = treeAdapter.createElement('title', null, []);
        DOM.appendChild(headNode, titleNode);
    }
    doc._window = {};
    doc.head = headNode;
    doc.body = bodyNode;
    var titleNodeText = titleNode.children[0];
    Object.defineProperty(doc, 'title', {
        get: function () { return titleNodeText.data; },
        set: function (newTitle) { return titleNodeText.data = newTitle; }
    });
    return doc;
}
exports.parseDocument = parseDocument;
function serializeDocument(document) {
    return serializer.serialize(document);
}
exports.serializeDocument = serializeDocument;
//# sourceMappingURL=document.js.map