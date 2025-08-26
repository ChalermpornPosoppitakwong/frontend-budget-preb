import { inject } from '@angular/core';
import {
	provideTranslocoLocale,
	TranslocoLocaleService,
} from '@jsverse/transloco-locale';

export const localeMap: Record<string, string> = {
	en: 'en-US',
	th: 'th-TH',
};

export function setLocaleFor(lang: string) {
	const locale = localeMap[lang] ?? 'en-US';
	const localeSvc = inject(TranslocoLocaleService);
	localeSvc.setLocale(locale);
}

export const provideLocale = () =>
	provideTranslocoLocale({
		langToLocaleMapping: localeMap,
	});
