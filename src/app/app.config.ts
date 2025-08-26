import {
	provideHttpClient,
	withInterceptorsFromDi,
} from '@angular/common/http';
import {
	ApplicationConfig,
	provideBrowserGlobalErrorListeners,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTransloco } from '@jsverse/transloco';
import { provideTranslocoLocale } from '@jsverse/transloco-locale';

import { routes } from './app.routes';
import { translocoConfigFactory } from './i18n/transloco.config';
import { TranslocoHttpLoader } from './i18n/transloco-http-loader';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideHttpClient(withInterceptorsFromDi()),
		provideRouter(routes),
		provideTransloco({
			config: translocoConfigFactory(),
			loader: TranslocoHttpLoader,
		}),
		provideTranslocoLocale(),
	],
};
