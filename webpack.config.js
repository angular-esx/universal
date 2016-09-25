// import 'angular2-universal-polyfills';
require('angular2-universal-polyfills');

var webpack = require('webpack');
var path = require('path');
var clone = require('js.clone');

var ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

import { UniversalPrerender } from 'angular2-webpack-prerender';
import { MainModule } from './src/main.node';

var sharedPlugins = [
  new ContextReplacementPlugin(
    // The (\\|\/) piece accounts for path separators in *nix and Windows
    /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
    root('./src')
  ),
  new UniversalPrerender({
    ngModule: MainModule,
    documentPath: 'index.html',
    document: `
<!doctype>
<html lang="en">
<head>
  <title>Angular 2 Universal Starter</title>
  <meta charset="UTF-8">
  <meta name="description" content="Angular 2 Universal">
  <meta name="keywords" content="Angular 2,Universal">
  <meta name="author" content="PatrickJS">

  <link rel="icon" href="data:;base64,iVBORw0KGgo=">

  <base href="/">
<body>
  <div style="position: absolute;z-index: 1000000;bottom: 9px">
    <button onclick="bootstrap()">Bootstrap Client</button>
    <button onclick="location.reload()">Reload Client</button>
  </div>

  <app>
    Loading...
  </app>

  <script src="dist/public/browser-bundle.js"></script>
</body>
</html>
    `,
    time: true,
    originUrl: 'http://localhost:3000',
    baseUrl: '/',
    requestUrl: '/',
    preboot: false,
    // preboot: { appRoot: ['app'], uglify: true },
  })
];
var webpackConfig = {
  // cache: true,

  // devtool: 'source-map',

  output: {
    filename: '[name]-bundle.js',
    path: './dist',
  },

  module: {
    preLoaders: [
      // fix angular2
      {
        test: /(systemjs_component_resolver|system_js_ng_module_factory_loader)\.js$/,
        loader: 'string-replace-loader',
        query: {
          search: '(lang_1(.*[\\n\\r]\\s*\\.|\\.))?(global(.*[\\n\\r]\\s*\\.|\\.))?(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import',
          replace: 'System.import',
          flags: 'g'
        }
      },
      {
        test: /.js$/,
        loader: 'string-replace-loader',
        query: {
          search: 'moduleId: module.id,',
          replace: '',
          flags: 'g'
        }
      }
      // end angular2 fix
    ],
    loaders: [
      // .ts files for TypeScript
      { test: /\.(js|ts)$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'], exclude: [/node_modules/] },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.css$/, loader: 'raw-loader' }
    ],
    postLoaders: [
      {
        test: /\.js$/,
        loader: 'string-replace-loader',
        query: {
          search: 'var sourceMappingUrl = extractSourceMappingUrl\\(cssText\\);',
          replace: 'var sourceMappingUrl = "";',
          flags: 'g'
        }
      }
    ]

  },

  plugins: [
    // don't define plugins here. define them above in shared plugins
  ],

  resolve: {

    // packageMains: ['jsnext:main', 'main', 'jsnext:browser', 'browser', 'jsnext:main'],

    extensions: ['', '.ts', '.js', '.json'],

    alias: {
      // 'rxjs': root('node_modules/rxjs-es'),
      // '@angular/common': root('node_modules/@angular/common/esm'),
      // '@angular/compiler': root('node_modules/@angular/cpmiler/esm'),
      // '@angular/core': root('node_modules/@angular/core/esm'),
      // '@angular/forms': root('node_modules/@angular/forms/esm'),
      // '@angular/http': root('node_modules/@angular/http/esm'),
      // '@angular/platform-browser': root('node_modules/@angular/platform-browser/esm'),
      // '@angular/platform-browser-dynamic': root('node_modules/@angular/platform-browser-dynamic/esm'),
      // '@angular/platform-server': root('node_modules/@angular/platform-server/esm'),

    }

  },

};

module.exports = [
  plugins(sharedPlugins, getConfig(clone(webpackConfig)))
]

function getConfig(config) {
  config.target = 'web';
  config.entry =  './src/client.js',
  config.output.filename = 'public/browser-bundle.js';
  config.output.library = 'universal';
  config.output.libraryTarget = 'var';

  config.node = {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false,
    module: false,
  };

  return config;
};

function plugins(plugins, config) {
  config.plugins = config.plugins.concat(plugins);
  return config
}


function setTypeScriptAlias(tsConfig, config) {
  var newConfig = clone(config);
  newConfig = newConfig || {};
  newConfig.resolve = newConfig.resolve || {};
  newConfig.resolve.alias = newConfig.resolve.alias || {};
  var tsPaths = tsConfig.compilerOptions.paths;
  for (var prop in tsPaths) {
    newConfig.resolve.alias[prop]  = root(tsPaths[prop][0]);
  }
  return newConfig;
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
