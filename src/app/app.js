import {Component} from '@angular/core';

export let App = Component({
  selector: 'app',
  directives: [
  ],
  styles: [`
  `],
  template: `
  <div>
    <div>
      <span x-large>Hello, {{ name }}!</span>
    </div>

    name: <input type="text" [value]="name" (input)="name = $event.target.value" autofocus>
    <main>
      
    </main>
  </div>
  `
})
  .Class({
    constructor: function () {
      this.name = 'Angular 2';
    }
  });