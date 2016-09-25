import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UniversalModule } from 'angular2-universal';

import { App } from './src/app/app';

export var MainModule = NgModule({
  bootstrap: [App],
  declarations: [App],
  imports: [
    UniversalModule,
    FormsModule
  ]
}).Class({
  constructor: function () { }
});
