import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTransloco } from '@jsverse/transloco';
import { provideTranslocoLocale } from '@jsverse/transloco-locale';
import { App } from './app';
import { translocoConfigFactory } from './i18n/transloco.config';
import { TranslocoHttpLoader } from './i18n/transloco-http-loader';

describe('App', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [App],
			providers: [
				provideHttpClientTesting(),
				provideRouter([]),
				provideTransloco({
					config: translocoConfigFactory(),
					loader: TranslocoHttpLoader,
				}),
				provideTranslocoLocale(),
			],
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(App);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it('should have language service', () => {
		const fixture = TestBed.createComponent(App);
		const app = fixture.componentInstance;
		expect(app.language).toBeDefined();
	});

	it('should have activeLang getter', () => {
		const fixture = TestBed.createComponent(App);
		const app = fixture.componentInstance;
		expect(app.activeLang).toBeDefined();
	});

	it('should initialize language service on ngOnInit', () => {
		const fixture = TestBed.createComponent(App);
		const app = fixture.componentInstance;
		const initSpy = jest.spyOn(app.language, 'init');

		app.ngOnInit();

		expect(initSpy).toHaveBeenCalled();
	});
});
