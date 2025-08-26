import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [TranslocoPipe],
	templateUrl: './home.component.html',
})
export class HomeComponent {
	userName = 'Rende';
	amount = 1999.99;
	date = new Date();
}
