import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslocoLoader } from '@jsverse/transloco';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
	constructor(private http: HttpClient) {}

	getTranslation(lang: string): Observable<Record<string, unknown>> {
		return this.http.get<Record<string, unknown>>(`/assets/i18n/${lang}.json`);
	}
}
