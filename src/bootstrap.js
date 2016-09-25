// // the polyfills must be the first thing imported		
// import 'angular2-universal/polyfills';
// // Angular 2 Universal		
// import {prebootComplete} from 'angular2-universal';

// import {bootstrap} from '@angular/platform-browser-dynamic';
// import {enableProdMode} from '@angular/core';

// import {App} from './app/app';

// // enable prod for faster renders
// enableProdMode();

// // on document ready bootstrap Angular 2
// document.addEventListener('DOMContentLoaded', () => {
//   bootstrap(App, [])
//     .then(prebootComplete);

// });

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { App } from './app/app';

var AppModule = NgModule({
  imports: [BrowserModule],
  declarations: [App],
  bootstrap: [App]
})
  .Class({
    constructor: function () { }
  });

document.addEventListener('DOMContentLoaded', function () {
  platformBrowserDynamic()
    .bootstrapModule(AppModule);
});