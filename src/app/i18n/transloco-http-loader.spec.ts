import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TranslocoHttpLoader } from './transloco-http-loader';

describe('TranslocoHttpLoader', () => {
	let service: TranslocoHttpLoader;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [TranslocoHttpLoader],
		});

		service = TestBed.inject(TranslocoHttpLoader);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should load translation for given language', () => {
		const mockTranslation = { hello: 'Hello' };
		const lang = 'en';

		service.getTranslation(lang).subscribe((translation) => {
			expect(translation).toEqual(mockTranslation);
		});

		const req = httpMock.expectOne(`/assets/i18n/${lang}.json`);
		expect(req.request.method).toBe('GET');
		req.flush(mockTranslation);
	});

	it('should load translation for Thai language', () => {
		const mockTranslation = { hello: 'สวัสดี' };
		const lang = 'th';

		service.getTranslation(lang).subscribe((translation) => {
			expect(translation).toEqual(mockTranslation);
		});

		const req = httpMock.expectOne(`/assets/i18n/${lang}.json`);
		expect(req.request.method).toBe('GET');
		req.flush(mockTranslation);
	});
});
