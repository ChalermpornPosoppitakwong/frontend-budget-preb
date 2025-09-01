import { TestBed } from '@angular/core/testing';
import { TranslocoLocaleService } from '@jsverse/transloco-locale';
import {
	localeMap,
	provideLocale,
	setLocaleFor,
} from './transloco-locale.config';

describe('TranslocoLocaleConfig', () => {
	describe('localeMap', () => {
		it('should have correct locale mappings', () => {
			expect(localeMap['en']).toBe('en-US');
			expect(localeMap['th']).toBe('th-TH');
		});
	});

	describe('setLocaleFor', () => {
		let localeService: jest.Mocked<TranslocoLocaleService>;

		beforeEach(() => {
			const spy = {
				setLocale: jest.fn(),
			} as unknown as jest.Mocked<TranslocoLocaleService>;

			TestBed.configureTestingModule({
				providers: [{ provide: TranslocoLocaleService, useValue: spy }],
			});

			localeService = TestBed.inject(
				TranslocoLocaleService,
			) as jest.Mocked<TranslocoLocaleService>;
		});

		it('should set locale for English', () => {
			TestBed.runInInjectionContext(() => {
				setLocaleFor('en');
				expect(localeService.setLocale).toHaveBeenCalledWith('en-US');
			});
		});

		it('should set locale for Thai', () => {
			TestBed.runInInjectionContext(() => {
				setLocaleFor('th');
				expect(localeService.setLocale).toHaveBeenCalledWith('th-TH');
			});
		});

		it('should default to en-US for unknown language', () => {
			TestBed.runInInjectionContext(() => {
				setLocaleFor('unknown');
				expect(localeService.setLocale).toHaveBeenCalledWith('en-US');
			});
		});
	});

	describe('provideLocale', () => {
		it('should return provider', () => {
			const provider = provideLocale();
			expect(provider).toBeDefined();
		});
	});
});
