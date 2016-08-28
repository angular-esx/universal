import gulp = require('gulp');
import 'angular2-universal/polyfills';
import {REQUEST_URL, NODE_LOCATION_PROVIDERS} from 'angular2-universal';
import {provide, enableProdMode} from '@angular/core';
// import {APP_BASE_HREF, ROUTER_PROVIDERS} from '@angular/router';
import {prerender} from './angular2-gulp-prerender';

import {App} from './src/app/app';

enableProdMode();

gulp.task('prerender', () => {

  return gulp.src('./src/index.html')
    .pipe(prerender({
      directives: [ App ],
      providers: [
        // provide(APP_BASE_HREF, {useValue: '/'}),
        // provide(REQUEST_URL, {useValue: '/'}),
        // ROUTER_PROVIDERS,
        // NODE_LOCATION_PROVIDERS,
      ],
      preboot: false
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch:prerender', () => {
  gulp.watch(['./src/index.html', './src/app/**'], ['prerender']);
});

gulp.task('default', ['prerender'], () => {
  console.log('welcome');
});
