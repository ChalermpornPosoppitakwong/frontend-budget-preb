import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import {
	TranslocoCurrencyPipe,
	TranslocoPercentPipe,
} from '@jsverse/transloco-locale';

@Component({
	selector: 'app-admin',
	standalone: true,
	imports: [TranslocoPipe, TranslocoPercentPipe, TranslocoCurrencyPipe],
	templateUrl: './admin.component.html',
})
export class AdminComponent {}
