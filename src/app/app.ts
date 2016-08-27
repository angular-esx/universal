import {Component} from '@angular/core';

@Component({
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
export class App {
  name: string = 'Angular 2';
}