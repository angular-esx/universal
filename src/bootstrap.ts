// the polyfills must be the first thing imported
import 'angular2-universal/polyfills';
// Angular 2 Universal
import {prebootComplete} from 'angular2-universal';

import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';

import {App} from './app/app';

// enable prod for faster renders
enableProdMode();

// on document ready bootstrap Angular 2
document.addEventListener('DOMContentLoaded', () => {
  bootstrap(App, [])
    .then(prebootComplete);

});