import {Bootloader, BootloaderConfig} from 'angular2-universal';
import * as through from 'through2';
var gutil = require('gutil');

let PluginError = gutil.PluginError;

export function prerender(options) {
  function transform(file, enc, cb) {

    if (file.isStream()) {
      return cb(new PluginError('angular2-gulp-prerender', 'Streaming is not supported'));
    }

    let template = file.contents.toString();

    // bootstrap and render component to string
    const _options = options;
    const _template = template;
    const _Bootloader = Bootloader;
    let bootloader = _options.bootloader;
    if (_options.bootloader) {
      bootloader = _Bootloader.create(_options.bootloader);
    } else {
      let doc = _Bootloader.parseDocument(_template);
      _options.document = doc;
      _options.template = _options.template || _template;
      bootloader = _Bootloader.create(_options);
    }

    return bootloader.serializeApplication()
      .then(html => {
        file.contents = new Buffer(html);
        cb(null, file);
      });
  }
  return through.obj(transform);
}