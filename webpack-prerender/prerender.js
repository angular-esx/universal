import { platformUniversalDynamic } from 'angular2-universal';
import { PrebootOptions } from 'preboot';

// var Zone;

export class UniversalPrerender {
  
  constructor(_options) {
      this._options = _options;
    // if (this._options.ngModule) {
    //   this.platformRef.cacheModuleFactory(this._options.ngModule);
    // }
  }

  apply(compiler) {
    compiler.plugin('emit', (_compilation, _callback) => {
      this.platformRef = this.platformRef || platformUniversalDynamic();
      this._options.document = this._options.document || _compilation.assets[this._options.documentPath].source();
      const zone = Zone.current.fork({
        name: 'UNIVERSAL prerender',
        properties: this._options
      });
      zone.run(() => (this.platformRef.serializeModule(this._options.ngModule, this._options))
        .then((html) => {
          if (typeof html !== 'string' || this._options.cancel) {
            _compilation.assets[this._options.documentPath] = {
              source: () => this._options.document,
              size: () => this._options.document.length
            };
            return _callback();
          }
          _compilation.assets[this._options.documentPath] = {
            source: () => html,
            size: () => html.length
          };
          return _callback();
        })); // zone.run
    }); // compiler.plugin
  } // apply
}
