"use strict";
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var node_1 = require('./platform/node');
var document_1 = require('./platform/document');
var ng_preboot_1 = require('./ng_preboot');
require('./make_parse5_current'); // ensure Parse5DomAdapter is used
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var DOM = dom_adapter_1.getDOM();
var Bootloader = (function () {
    function Bootloader(config) {
        this._config = { async: true, preboot: false };
        this.disposed = false;
        this.pending = false;
        this.pendingDisposed = false;
        Object.assign(this._config, this._deprecated(config) || {});
        this.platformRef = this.platform();
        // this.applicationRef = this.application();
    }
    Bootloader.create = function (config) {
        if (config instanceof Bootloader) {
            return config;
        }
        return new Bootloader(config);
    };
    Bootloader.applicationRefToString = function (applicationRefs) {
        var text = 'DEPRECATION WARNING: `Bootloader.applicationRefToString` will be removed.';
        console.warn(text + 'Please use open an issue at https://github.com/angular/universal/issues/new');
        var injector = applicationRefs.injector;
        if (Array.isArray(applicationRefs)) {
            injector = applicationRefs[0].injector;
        }
        var document = injector.get(platform_browser_1.DOCUMENT);
        var rendered = Bootloader.serializeDocument(document);
        return rendered;
    };
    Bootloader.parseFragment = function (document) { return document_1.parseFragment(document); };
    Bootloader.parseDocument = function (document) { return document_1.parseDocument(document); };
    Bootloader.serializeDocument = function (document) { return document_1.serializeDocument(document); };
    Bootloader.prototype.document = function (document) {
        if (document === void 0) { document = null; }
        var doc = document || this._config.template;
        if (typeof doc === 'string') {
            return Bootloader.parseDocument(doc);
        }
        return doc;
    };
    Bootloader.prototype.platform = function (providers) {
        var pro = providers || this._config.platformProviders;
        var customProviders = core_1.ReflectiveInjector.resolveAndCreate(node_1.buildNodeProviders(pro));
        return core_1.createPlatform(customProviders);
    };
    Bootloader.prototype.application = function (document, providers) {
        var doc = this.document(document);
        var pro = providers || this._config.providers;
        var customProviders = node_1.buildNodeAppProviders(doc, pro);
        var appinjector = core_1.ReflectiveInjector.resolveAndCreate(customProviders, this.platformRef.injector);
        return appinjector;
    };
    Bootloader.prototype.bootstrap = function (Component) {
        var text = 'DEPRECATION WARNING: `Bootloader#bootstrap` will be removed.';
        console.warn(text + 'Please use open an issue at https://github.com/angular/universal/issues/new');
        var component = Component || this._config.component;
        if (component) {
            // .then(waitRouter)); // fixed by checkStable()
            return core_1.coreLoadAndBootstrap(this.application(), component);
        }
        else {
            return this._bootstrapAll(component);
        }
    };
    Bootloader.prototype.serialize = function (Component) {
        var text = 'DEPRECATION WARNING: `Bootloader#serialize` will be removed.';
        console.warn(text + 'Please use open an issue at https://github.com/angular/universal/issues/new');
        return this.bootstrap(Component)
            .then(Bootloader.applicationRefToString);
    };
    Bootloader.prototype.serializeApplication = function (config, providers) {
        var _this = this;
        // TODO(gdi2290): remove legacy api
        if ((config === null || config === undefined) && providers) {
            var text = 'DEPRECATION WARNING: `Bootloader#serializeApplication` arguments has changed.';
            console.warn(text + 'Please use an `AppConfig` interface {providers: Array<any>, directives: Array<any>, template?: string}');
            config = { providers: providers, directives: this._config.directives, template: this._config.template };
        }
        var errorType = null;
        this.pending = true;
        return this._applicationAll(config)
            .then(function (configRefs) {
            if (!_this.disposed && 'ngOnInit' in _this._config) {
                if (!_this._config.ngOnInit) {
                    return configRefs;
                }
                var document_2 = configRefs[0].applicationRef.injector.get(platform_browser_1.DOCUMENT);
                return Promise.resolve(_this._config.ngOnInit(configRefs, document_2)).then(function () { return configRefs; });
            }
            return configRefs;
        })
            .catch(function (err) {
            errorType = errorType || 'ngOnInit Error:';
            return Promise.reject(err);
        })
            .then(function (configRefs) {
            if (!_this.disposed && 'async' in _this._config) {
                if (!_this._config.async) {
                    return configRefs;
                }
                var promise = _this._async(configRefs);
                return promise;
            }
            else {
                return configRefs;
            }
        })
            .catch(function (err) {
            errorType = errorType || 'Async Error:';
            return Promise.reject(err);
        })
            .then(function (configRefs) {
            if (!_this.disposed && 'ngOnStable' in _this._config) {
                if (!_this._config.ngOnStable) {
                    return configRefs;
                }
                var document_3 = configRefs[0].applicationRef.injector.get(platform_browser_1.DOCUMENT);
                return Promise.resolve(_this._config.ngOnStable(configRefs, document_3)).then(function () { return configRefs; });
            }
            return configRefs;
        })
            .catch(function (err) {
            errorType = errorType || 'ngOnStable Error:';
            return Promise.reject(err);
        })
            .then(function (configRefs) {
            if (!_this.disposed && 'preboot' in _this._config && _this._config.preboot) {
                var promise = _this._preboot(configRefs);
                return promise;
            }
            else {
                return configRefs;
            }
        })
            .catch(function (err) {
            errorType = errorType || 'preboot Error:';
            return Promise.reject(err);
        })
            .then(function (configRefs) {
            if (!_this.disposed && configRefs && configRefs.length) {
                var document_4 = configRefs[0].applicationRef.injector.get(platform_browser_1.DOCUMENT);
                var rendered = Bootloader.serializeDocument(document_4);
                // dispose;
                for (var i = 0; i < configRefs.length; i++) {
                    var config_1 = configRefs[i];
                    config_1.componentRef.destroy();
                    config_1.applicationRef.dispose();
                }
                return rendered;
            }
        })
            .catch(function (err) {
            errorType = errorType || 'Rendering Document Error:';
            return Promise.reject(err);
        })
            .then(function (rendered) {
            if (!_this.disposed && 'beautify' in _this._config) {
                if (!_this._config.beautify) {
                    return rendered;
                }
                var beautify = require('js-beautify');
                return beautify.html(rendered, { indent_size: 2 });
            }
            return rendered;
        })
            .then(function (rendered) {
            if (!_this.disposed && 'ngOnRendered' in _this._config) {
                if (!_this._config.ngOnRendered) {
                    return rendered;
                }
                return Promise.resolve(_this._config.ngOnRendered(rendered)).then(function () { return rendered; });
            }
            _this.pending = false;
            return rendered;
        })
            .catch(function (err) {
            _this.pending = false;
            errorType = errorType || 'ngOnRendered Error:';
            console.log(errorType, err);
            throw err;
        });
    };
    Bootloader.prototype._bootstrapAll = function (Components, componentProviders) {
        var _this = this;
        var components = Components || this._config.directives;
        if (components.length <= 0) {
            throw new Error('Error Universal: Please provide a component in the directives: []');
        }
        var providers = componentProviders || this._config.componentProviders;
        // .then(waitRouter)); // fixed by checkStable()
        var directives = components.map(function (component) { return _this.application().bootstrap(component); });
        return Promise.all(directives);
    };
    Bootloader.prototype._applicationAll = function (config) {
        var _this = this;
        if (config === void 0) { config = {}; }
        var components = config.directives || this._config.directives;
        var providers = config.providers || this._config.providers;
        var doc = this.document(config.template || this._config.template);
        if (!Array.isArray(components)) {
            throw new Error('Error Universal: directives: must be an array with components');
        }
        if (components.length <= 0) {
            throw new Error('Error Universal: Please provide a component in the directives: []');
        }
        var directives = components.map(function (component) {
            // var applicationRef = this.application(doc, providers);
            // .then(waitRouter)); // fixed by checkStable()
            var appInjector = _this.application(doc, providers);
            node_1.buildReflector();
            var compRef = core_1.coreLoadAndBootstrap(component, appInjector);
            // let compRef = Promise.resolve(applicationRef.bootstrap(component));
            return compRef.then(function (componentRef) {
                var configRef = {
                    applicationRef: appInjector.get(core_1.ApplicationRef),
                    componentRef: componentRef
                };
                return configRef;
            });
        });
        return Promise.all(directives);
    };
    Bootloader.prototype._async = function (configRefs) {
        var ngDoCheck = this._config.ngDoCheck || function returnTrue() { return true; };
        function configMap(config, i) {
            var appInjector = config.applicationRef.injector;
            var cmpInjector = config.componentRef.injector;
            // app injector
            var ngZone = appInjector.get(core_1.NgZone);
            // component injector
            var http = cmpInjector.get(http_1.Http, http_1.Http);
            var jsonp = cmpInjector.get(http_1.Jsonp, http_1.Jsonp);
            var promise = new Promise(function (resolve) {
                ngZone.runOutsideAngular(function outsideNg() {
                    var checkAmount = 0;
                    var checkCount = 0;
                    function checkStable() {
                        // we setTimeout 10 after the first 20 turns
                        checkCount++;
                        if (checkCount === 2000) {
                            console.warn('\nWARNING: your application is taking a long time to render the application\n');
                        }
                        if (checkCount === 20) {
                            checkAmount = 10;
                        }
                        function stable() {
                            if (ngZone.hasPendingMicrotasks) {
                                return checkStable();
                            }
                            if (ngZone.hasPendingMacrotasks) {
                                return checkStable();
                            }
                            if (http && http._async > 0) {
                                return checkStable();
                            }
                            if (jsonp && jsonp._async > 0) {
                                return checkStable();
                            }
                            if (ngZone.isStable) {
                                var isStable = ngDoCheck(config, ngZone);
                                if (isStable === true) {
                                }
                                else if (typeof isStable !== 'boolean') {
                                    console.warn('\nWARNING: ngDoCheck must return a boolean value of either true or false\n');
                                }
                                else {
                                    return checkStable();
                                }
                            }
                            if (ngZone.isStable) {
                                return resolve(config);
                            }
                            return checkStable();
                        }
                        setTimeout(stable, checkAmount);
                    }
                    return checkStable();
                });
            });
            return promise;
        }
        var apps = configRefs.map(configMap);
        return Promise.all(apps);
    };
    Bootloader.prototype._preboot = function (configRefs) {
        var prebootCode = ng_preboot_1.createPrebootCode(this._config.directives, this._config.preboot);
        return prebootCode
            .then(function (code) {
            // TODO(gdi2290): manage the codegen better after preboot supports multiple appRoot
            var lastRef = configRefs[configRefs.length - 1];
            var el = lastRef.componentRef.location.nativeElement;
            var script = document_1.parseFragment(code);
            var prebootEl = DOM.createElement('div');
            DOM.setInnerHTML(prebootEl, code);
            DOM.insertAfter(el, prebootEl);
            return configRefs;
        })
            .catch(function (err) {
            console.log('preboot Error: ', err);
            return configRefs;
        });
    };
    Bootloader.prototype.dispose = function () {
        this.pendingDisposed = true;
        if (this.pending === true) {
            return;
        }
        this.platformRef.dispose();
        this._config = null;
        this.platformRef = null;
        this.disposed = true;
    };
    Bootloader.prototype._deprecated = function (config) {
        if (config['document'] !== undefined) {
            var text = 'DEPRECATION WARNING: `document` is no longer supported';
            console.warn(text + ' and will be removed in next release. Please use `template`');
            config.template = config['document'];
        }
        if (config['App'] !== undefined) {
            var text = 'DEPRECATION WARNING: `App` is no longer supported';
            console.warn(text + ' and will be removed in next release. Please use `directives: [ App ]`');
            config.directives = [config['App']];
        }
        if (config['maxZoneTurns'] !== undefined) {
            var text = 'DEPRECATION WARNING: `maxZoneTurns` is no longer supported';
            console.warn(text + ' and is removed.`');
        }
        return config;
    };
    return Bootloader;
}());
exports.Bootloader = Bootloader;
function bootloader(config) {
    if (config === void 0) { config = {}; }
    return new Bootloader(config);
}
exports.bootloader = bootloader;
//# sourceMappingURL=bootloader.js.map