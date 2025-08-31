import { environment } from '@environments/environment';
import { TranslocoConfig } from '@jsverse/transloco';

export const translocoConfigFactory = (): Partial<TranslocoConfig> => ({
	availableLangs: ['en', 'th'],
	defaultLang: 'en',
	fallbackLang: 'en',
	reRenderOnLangChange: true,
	prodMode: environment.production,
	missingHandler: {
		allowEmpty: true,
		useFallbackTranslation: true,
		logMissingKey: !environment.production,
	},
});
