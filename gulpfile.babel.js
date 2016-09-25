// import gulp from 'gulp';
// import 'angular2-universal/polyfills';
// import {REQUEST_URL, NODE_LOCATION_PROVIDERS} from 'angular2-universal';
// import {provide, enableProdMode} from '@angular/core';
// // import {APP_BASE_HREF, ROUTER_PROVIDERS} from '@angular/router';
// import {prerender} from './angular2-gulp-prerender';

// import {App} from './src/app/app';

// enableProdMode();

// gulp.task('prerender', () => {

//   return gulp.src('./src/index.html')
//     .pipe(prerender({
//       directives: [ App ],
//       providers: [
//         // provide(APP_BASE_HREF, {useValue: '/'}),
//         // provide(REQUEST_URL, {useValue: '/'}),
//         // ROUTER_PROVIDERS,
//         // NODE_LOCATION_PROVIDERS,
//       ],
//       preboot: false
//     }))
//     .pipe(gulp.dest('dist'));
// });

// gulp.task('watch:prerender', () => {
//   gulp.watch(['./src/index.html', './src/app/**'], ['prerender']);
// });

// gulp.task('default', ['prerender'], () => {
//   console.log('welcome');
// });

import gulp from 'gulp';
import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';
import { UniversalPrerender } from './webpack-prerender';
import { MainModule } from './main.node';
import ContextReplacementPlugin from 'webpack/lib/ContextReplacementPlugin';

var commonConfig = {
  context: path.resolve(__dirname),
  plugins: [],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'angular2-template-loader'
      },
      { test: /\.html$/, loader: 'html-loader' },
      {
        test: /\.(scss|sass)$/,
        loader: './gulp-tasks/clean-code-loader!postcss-loader!sass-loader'
      }
    ]
  },

  postcss: function () {
    return [autoprefixer];
  },
};

gulp.task('default', ['clean', 'webpack']);

gulp.task('clean', function () {
  var del = require('del');

  del.sync(['./dist/**']);
})

gulp.task('copy:index', ['clean'], function () {
  return gulp.src('./src/index.html').pipe(gulp.dest('dist'));
});

gulp.task('webpack', ['clean'], function () {

  var sharedPlugins = [
    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      root('./src')
    ),
    new UniversalPrerender({
      ngModule: MainModule,
      documentPath: '../index.html',
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

  commonConfig.entry = {
    vendors: './configs/webpack/vendors.js',
    polyfills: './configs/webpack/polyfills.js',
    app: './src/bootstrap.js'
  };

  commonConfig.output = {
    path: './dist/js',
    filename: '[name].js'
  };

  commonConfig.plugins = sharedPlugins;

  // commonConfig.plugins = [
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: ['app', 'vendors', 'polyfills']
  //   })
  // ];

  webpack(commonConfig, function (err, stats) {
    if (err) {
      console.log(err);

      _deferred.reject();
    }

    if (stats) {
      console.log(stats.toString({
        colors: true,
        children: false,
        chunks: false,
        modules: false
      }));
    }
  });
})

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
