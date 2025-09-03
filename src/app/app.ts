import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import {
	TranslocoCurrencyPipe,
	TranslocoDatePipe,
	TranslocoPercentPipe,
} from '@jsverse/transloco-locale';
import { LanguageService } from './i18n/language.service';

@Component({
	selector: 'app-root',
	imports: [
		// TranslocoPipe,
		// TranslocoDatePipe,
		// TranslocoPercentPipe,
		// TranslocoCurrencyPipe,
		RouterOutlet,
	],
	templateUrl: './app.html',
	styleUrl: './app.css',
})
export class App implements OnInit {
	language = inject(LanguageService);
	now = new Date();

	ngOnInit() {
		this.language.init();
	}

	get activeLang() {
		return this.language.activeLang$();
	}
}
