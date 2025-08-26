import { Injectable, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { TranslocoLocaleService } from '@jsverse/transloco-locale';

const STORAGE_KEY = 'app_lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
	private _active = signal<string>('en');
	activeLang$ = this._active.asReadonly();

	constructor(
		private transloco: TranslocoService,
		private locale: TranslocoLocaleService,
	) {}

	init() {
		const initial = this.getInitialLang();
		this.setLang(initial);
	}

	getInitialLang(): 'en' | 'th' {
		const saved = localStorage.getItem(STORAGE_KEY) as 'en' | 'th' | null;
		if (saved) return saved;
		const nav = navigator.language?.toLowerCase() ?? 'en';
		return nav.startsWith('th') ? 'th' : 'en';
	}

	setLang(lang: 'en' | 'th') {
		this._active.set(lang);
		this.transloco.setActiveLang(lang);
		this.locale.setLocale(lang === 'th' ? 'th-TH' : 'en-US');
		localStorage.setItem(STORAGE_KEY, lang);
	}

	toggleLang() {
		const next = this._active() === 'en' ? 'th' : 'en';
		this.setLang(next);
	}
}
