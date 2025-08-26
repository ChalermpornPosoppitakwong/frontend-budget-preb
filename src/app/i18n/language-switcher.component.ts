import { Component, inject } from '@angular/core';
import { LanguageService } from './language.service';

@Component({
	selector: 'app-language-switcher',
	standalone: true,
	imports: [],
	template: `
    <div class="flex gap-2">
      <button 
        class="btn" 
        [class.btn-primary]="language.activeLang$() === 'en'"
        [class.btn-outline]="language.activeLang$() !== 'en'"
        (click)="language.setLang('en')">
        EN
      </button>
      <button 
        class="btn"
        [class.btn-primary]="language.activeLang$() === 'th'"
        [class.btn-outline]="language.activeLang$() !== 'th'"
        (click)="language.setLang('th')">
        TH
      </button>
    </div>
  `,
})
export class LanguageSwitcherComponent {
	language = inject(LanguageService);
}
