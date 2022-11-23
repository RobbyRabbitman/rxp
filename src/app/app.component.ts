import { Component } from '@angular/core';
import { SHOW_CASES } from './model/show-case/show-case';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showCases = SHOW_CASES;
}
