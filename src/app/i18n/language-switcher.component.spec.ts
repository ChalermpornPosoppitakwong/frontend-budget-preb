import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';
import { LanguageSwitcherComponent } from './language-switcher.component';

describe('LanguageSwitcherComponent', () => {
	let component: LanguageSwitcherComponent;
	let fixture: ComponentFixture<LanguageSwitcherComponent>;
	let _languageService: jest.Mocked<LanguageService>;

	beforeEach(async () => {
		const languageServiceSpy = {
			setLang: jest.fn(),
			activeLang$: signal('en').asReadonly(),
		} as unknown as jest.Mocked<LanguageService>;

		await TestBed.configureTestingModule({
			imports: [LanguageSwitcherComponent],
			providers: [{ provide: LanguageService, useValue: languageServiceSpy }],
		}).compileComponents();

		fixture = TestBed.createComponent(LanguageSwitcherComponent);
		component = fixture.componentInstance;
		_languageService = TestBed.inject(
			LanguageService,
		) as jest.Mocked<LanguageService>;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have language service injected', () => {
		expect(component.language).toBeTruthy();
	});
});
