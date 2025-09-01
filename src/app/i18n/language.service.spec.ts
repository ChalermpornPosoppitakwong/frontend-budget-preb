import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';
import { TranslocoLocaleService } from '@jsverse/transloco-locale';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
	let service: LanguageService;
	let translocoSpy: jest.Mocked<TranslocoService>;
	let localeSpy: jest.Mocked<TranslocoLocaleService>;

	beforeEach(() => {
		const translocoMock = {
			setActiveLang: jest.fn(),
		} as unknown as jest.Mocked<TranslocoService>;
		const localeMock = {
			setLocale: jest.fn(),
		} as unknown as jest.Mocked<TranslocoLocaleService>;

		TestBed.configureTestingModule({
			providers: [
				LanguageService,
				{ provide: TranslocoService, useValue: translocoMock },
				{ provide: TranslocoLocaleService, useValue: localeMock },
			],
		});

		service = TestBed.inject(LanguageService);
		translocoSpy = TestBed.inject(
			TranslocoService,
		) as jest.Mocked<TranslocoService>;
		localeSpy = TestBed.inject(
			TranslocoLocaleService,
		) as jest.Mocked<TranslocoLocaleService>;

		// Clear localStorage before each test
		localStorage.clear();
	});

	afterEach(() => {
		localStorage.clear();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('init', () => {
		it('should initialize with saved language from localStorage', () => {
			localStorage.setItem('app_lang', 'th');
			const setLangSpy = jest.spyOn(service, 'setLang');

			service.init();

			expect(setLangSpy).toHaveBeenCalledWith('th');
		});

		it('should initialize with default language when no saved language', () => {
			const setLangSpy = jest.spyOn(service, 'setLang');

			service.init();

			expect(setLangSpy).toHaveBeenCalledWith('en');
		});
	});

	describe('getInitialLang', () => {
		it('should return saved language from localStorage', () => {
			localStorage.setItem('app_lang', 'th');

			const result = service.getInitialLang();

			expect(result).toBe('th');
		});

		it('should return "th" when navigator language starts with "th"', () => {
			Object.defineProperty(navigator, 'language', {
				writable: true,
				value: 'th-TH',
			});

			const result = service.getInitialLang();

			expect(result).toBe('th');
		});

		it('should return "en" when navigator language does not start with "th"', () => {
			Object.defineProperty(navigator, 'language', {
				writable: true,
				value: 'en-US',
			});

			const result = service.getInitialLang();

			expect(result).toBe('en');
		});

		it('should return "en" when navigator language is undefined', () => {
			Object.defineProperty(navigator, 'language', {
				writable: true,
				value: undefined,
			});

			const result = service.getInitialLang();

			expect(result).toBe('en');
		});
	});

	describe('setLang', () => {
		it('should set English language', () => {
			service.setLang('en');

			expect(service.activeLang$()).toBe('en');
			expect(translocoSpy.setActiveLang).toHaveBeenCalledWith('en');
			expect(localeSpy.setLocale).toHaveBeenCalledWith('en-US');
			expect(localStorage.getItem('app_lang')).toBe('en');
		});

		it('should set Thai language', () => {
			service.setLang('th');

			expect(service.activeLang$()).toBe('th');
			expect(translocoSpy.setActiveLang).toHaveBeenCalledWith('th');
			expect(localeSpy.setLocale).toHaveBeenCalledWith('th-TH');
			expect(localStorage.getItem('app_lang')).toBe('th');
		});
	});

	describe('toggleLang', () => {
		it('should toggle from English to Thai', () => {
			service.setLang('en');
			const setLangSpy = jest.spyOn(service, 'setLang');

			service.toggleLang();

			expect(setLangSpy).toHaveBeenCalledWith('th');
		});

		it('should toggle from Thai to English', () => {
			service.setLang('th');
			const setLangSpy = jest.spyOn(service, 'setLang');

			service.toggleLang();

			expect(setLangSpy).toHaveBeenCalledWith('en');
		});
	});
});
