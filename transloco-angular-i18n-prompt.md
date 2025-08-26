# Prompt สำหรับ Claude: สร้าง i18n ด้วย Transloco (Angular, runtime, no-reload)

**บทบาท:** คุณคือผู้ช่วยโค้ด Angular ระดับอาวุโส  
**เป้าหมาย:** ตั้งค่า Internationalization (i18n) แบบ **runtime** ใน Angular โดยใช้ `@ngneat/transloco` + `@ngneat/transloco-http-loader` และจัดการวันที่/ตัวเลข/สกุลเงินตาม locale ด้วย `@ngneat/transloco-locale` ให้ **สลับภาษาได้ทันทีโดยไม่ reload หน้า** และมีตัวอย่างการใช้งานครบถ้วน

---

## ข้อกำหนดเทคนิค
- Angular v17+ (prefer v20), ใช้ **Stand-alone components** (ไม่ใช้ NgModule ถ้าไม่จำเป็น)
- TypeScript strict, ESLint ผ่าน
- ใช้ **Transloco** (runtime) + **HTTP loader** โหลดไฟล์ JSON จาก `assets/i18n/`
- ใช้ **transloco-locale** สำหรับ format วันที่/ตัวเลข/สกุลเงินตามภาษา
- เก็บภาษาเลือกไว้ใน `localStorage` และ auto-detect จาก `navigator.language` ครั้งแรก
- **ไม่ reload หน้า** ตอนสลับภาษา (ใช้ `setActiveLang` และ pipe/directive ของ Transloco)
- รองรับ lazy scope ตัวอย่าง (`admin` scope)
- Fallback language = `en`
- กัน null/undefined ของ key (แสดงคีย์หรือข้อความเตือน dev)

---

## โครงสร้างไฟล์ที่ต้องสร้าง/แก้ไข
```
src/
  app/
    app.config.ts
    app.routes.ts
    app.component.ts
    app.component.html
    i18n/
      transloco.config.ts
      transloco-http-loader.ts
      transloco-locale.config.ts
      language.service.ts
      language-switcher.component.ts
    features/
      home/
        home.component.ts
        home.component.html
      admin/
        admin.component.ts
        admin.component.html
  assets/
    i18n/
      en.json
      th.json
```

---

## คำสั่งติดตั้ง (ให้แทรกใน README ส่วนบนของคำตอบ)
```bash
npm i @ngneat/transloco @ngneat/transloco-http-loader @ngneat/transloco-locale
```

---

## เนื้อหาที่ต้องส่งมอบ (โค้ดเต็ม คอมไพล์ได้จริง)

1) **Transloco base config** (`src/app/i18n/transloco.config.ts`)
- ตั้ง `availableLangs: ['en','th']`
- `defaultLang: 'en'`, `fallbackLang: 'en'`
- `reRenderOnLangChange: true`, `prodMode: environment.production`
- เพิ่ม `missingHandler` ให้คืนคีย์เดิมและ log ใน dev

2) **HTTP Loader** (`src/app/i18n/transloco-http-loader.ts`)
- โหลด JSON จาก `assets/i18n/<lang>.json`

3) **Locale config** (`src/app/i18n/transloco-locale.config.ts`)
- ผูก locale map: `en` → `en-US`, `th` → `th-TH`
- ใช้ `TranslocoLocaleModule.init()` หรือ `provideTranslocoLocale()`
- แสดงตัวอย่างใช้ pipe: `translocoDate`, `translocoNumber`, `translocoCurrency`

4) **LanguageService** (`src/app/i18n/language.service.ts`)
- ฟังก์ชัน: `getInitialLang()`, `setLang(lang)`, `toggleLang()`, `activeLang$`
- logic: อ่าน/เขียน `localStorage`, detect จาก `navigator.language`
- เซ็ตทั้ง Transloco (`setActiveLang`) และ TranslocoLocale (`setLocale`) พร้อมกัน

5) **Bootstrap** (`src/app/app.config.ts`)
- `provideHttpClient()`
- `provideTransloco({ config, loader })`
- `provideTranslocoLocale()` (ตั้งค่าเริ่มต้น locale ตามภาษาเริ่มต้น)
- ใช้ Standalone bootstrap แบบ Angular v17+

6) **AppComponent + HTML** (`src/app/app.component.ts` / `.html`)
- แสดงข้อความแปลด้วย pipe และ directive
- มีสวิตช์ภาษา (ปุ่ม หรือ `<select>`) เรียก `languageService.setLang(...)`
- โชว์ตัวอย่าง format วันที่/ตัวเลข/สกุลเงิน

ตัวอย่างใน HTML ที่ต้องมีอย่างน้อย:
```html
<h1 transloco="app.title"></h1>
<p>{{ 'app.description' | transloco }}</p>
<p>{{ 'app.currentLanguage' | transloco:{ lang: activeLang } }}</p>

<!-- date / number / currency demo -->
<p>{{ now | translocoDate:{ dateStyle: 'full' } }}</p>
<p>{{ 12345.678 | translocoNumber }}</p>
<p>{{ 1999.99 | translocoCurrency:'THB' }}</p>
<p>{{ 1999.99 | translocoCurrency:'USD' }}</p>

<button (click)="language.toggleLang()">{{ 'app.changeLanguage' | transloco }}</button>
```

7) **Route + Lazy scope** (`src/app/app.routes.ts`, `src/app/features/admin/*`)
- สร้าง `admin` feature เป็น **lazy route** และใช้ **Transloco scope 'admin'**

8) **Language Switcher Component** (`src/app/i18n/language-switcher.component.ts`)
- ปุ่ม/ dropdown เปลี่ยนภาษา
- แสดงภาษา current และสลับแบบทันที (subscribe กับ `activeLang$`)

9) **ไฟล์แปล** (`src/assets/i18n/en.json`, `src/assets/i18n/th.json`)
ตัวอย่างเนื้อหา:
```json
{
  "app": {
    "title": "Welcome",
    "description": "Runtime i18n with Transloco",
    "changeLanguage": "Change language",
    "currentLanguage": "Current language: {{lang}}"
  },
  "home": {
    "hello": "Hello {{name}}",
    "today": "Today is {{date}}",
    "balance": "Your balance is {{amount}}"
  },
  "admin": {
    "title": "Admin Panel",
    "users": "Users",
    "settings": "Settings"
  }
}
```
```json
{
  "app": {
    "title": "ยินดีต้อนรับ",
    "description": "แปลภาษาแบบ Runtime ด้วย Transloco",
    "changeLanguage": "เปลี่ยนภาษา",
    "currentLanguage": "ภาษาปัจจุบัน: {{lang}}"
  },
  "home": {
    "hello": "สวัสดี {{name}}",
    "today": "วันนี้คือ {{date}}",
    "balance": "ยอดเงินของคุณคือ {{amount}}"
  },
  "admin": {
    "title": "แผงผู้ดูแล",
    "users": "ผู้ใช้",
    "settings": "การตั้งค่า"
  }
}
```

10) **กัน key ไม่เจอ / debug**
- ตั้งค่า `missingHandler: { useFallbackTranslation: true, logMissingKey: true }` หรือ handler ที่คืนคีย์เดิมใน dev
- อธิบายสั้น ๆ วิธีตรวจจับคีย์หาย

11) **Unit test สั้น ๆ** สำหรับ `LanguageService`
- ทดสอบ `getInitialLang`, `setLang`, และ persistence ใน `localStorage`
- ใส่ mock ของ `TranslocoService` และ `TranslocoLocaleService`

12) **README ย่อในคำตอบ**
- วิธีติดตั้ง/รัน
- วิธีเพิ่มภาษาใหม่ (เพิ่ม `fr.json`, อัปเดต `availableLangs`, locale map)
- Best practices: ใช้ key ชัดเจน, ไม่ฝังข้อความดิบใน template, แยก scope ตาม feature

---

## บล็อกโค้ดตัวอย่างที่ต้องมี (ใส่ค่า/import ให้ครบ)

### 1) transloco.config.ts
```ts
import { environment } from '../../environments/environment';
import { TranslocoConfig } from '@ngneat/transloco';

export const translocoConfigFactory = (): TranslocoConfig => ({
  availableLangs: ['en', 'th'],
  defaultLang: 'en',
  fallbackLang: 'en',
  reRenderOnLangChange: true,
  prodMode: environment.production,
  missingHandler: {
    allowEmpty: true,
    useFallbackTranslation: true
  }
});
```

### 2) transloco-http-loader.ts
```ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslocoLoader } from '@ngneat/transloco';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(`/assets/i18n/${lang}.json`);
  }
}
```

### 3) transloco-locale.config.ts
```ts
import { inject } from '@angular/core';
import { provideTranslocoLocale, TranslocoLocaleService } from '@ngneat/transloco-locale';

export const localeMap: Record<string, string> = {
  en: 'en-US',
  th: 'th-TH'
};

export function setLocaleFor(lang: string) {
  const locale = localeMap[lang] ?? 'en-US';
  const localeSvc = inject(TranslocoLocaleService);
  localeSvc.setLocale(locale);
}

export const provideLocale = () =>
  provideTranslocoLocale({
    langToLocaleMapping: localeMap
  });
```

### 4) language.service.ts
```ts
import { Injectable, signal } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TranslocoLocaleService } from '@ngneat/transloco-locale';

const STORAGE_KEY = 'app_lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private _active = signal<string>('en');
  activeLang$ = this._active.asReadonly();

  constructor(
    private transloco: TranslocoService,
    private locale: TranslocoLocaleService
  ) {
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
```

### 5) app.config.ts
```ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideTransloco } from '@ngneat/transloco';
import { translocoConfigFactory } from './i18n/transloco.config';
import { TranslocoHttpLoader } from './i18n/transloco-http-loader';
import { provideTranslocoLocale } from '@ngneat/transloco-locale';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    provideTransloco({
      config: translocoConfigFactory(),
      loader: TranslocoHttpLoader
    }),
    provideTranslocoLocale()
  ]
};
```

### 6) app.routes.ts
```ts
import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/admin.component').then(m => m.AdminComponent)
  }
];
```

### 7) app.component.ts / .html
```ts
import { Component, inject } from '@angular/core';
import { TranslocoPipe, TranslocoDirective } from '@ngneat/transloco';
import { LanguageService } from './i18n/language.service';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TranslocoPipe, TranslocoDirective, AsyncPipe],
  templateUrl: './app.component.html'
})
export class AppComponent {
  language = inject(LanguageService);
  now = new Date();
  activeLang = 'en';
  constructor() {
    this.activeLang = this.language.getInitialLang();
  }
}
```
```html
<h1 transloco="app.title"></h1>
<p>{{ 'app.description' | transloco }}</p>
<p>{{ 'app.currentLanguage' | transloco:{ lang: activeLang } }}</p>

<p>{{ now | translocoDate:{ dateStyle: 'full' } }}</p>
<p>{{ 12345.678 | translocoNumber }}</p>
<p>{{ 1999.99 | translocoCurrency:'THB' }}</p>
<p>{{ 1999.99 | translocoCurrency:'USD' }}</p>

<button (click)="language.toggleLang()">{{ 'app.changeLanguage' | transloco }}</button>
<a routerLink="/admin">Admin</a>
```

### 8) home.component.ts / .html
```ts
import { Component } from '@angular/core';
import { TranslocoPipe, TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslocoPipe, TranslocoDirective],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  userName = 'Rende';
  amount = 1999.99;
  date = new Date();
}
```
```html
<h2 transloco="home.today"></h2>
<p>{{ 'home.hello' | transloco:{ name: userName } }}</p>
<p>{{ 'home.balance' | transloco:{ amount: (amount | translocoCurrency:'THB') } }}</p>
```

### 9) admin.component.ts / .html (แนะนำใช้ scope แยกไฟล์หรือ key ภายใต้ admin.*)
```ts
import { Component } from '@angular/core';
import { TranslocoPipe, TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TranslocoPipe, TranslocoDirective],
  templateUrl: './admin.component.html'
})
export class AdminComponent {}
```
```html
<h2 transloco="admin.title"></h2>
<ul>
  <li transloco="admin.users"></li>
  <li transloco="admin.settings"></li>
</ul>
```

---

## Demo Flow ที่คาดหวัง
- เปิดแอพครั้งแรก: ตรวจ `localStorage` → ถ้าไม่มีให้เดา `th` เมื่อ `navigator.language` เริ่มด้วย `th`, ไม่งั้น `en`
- สลับภาษาแล้ว ข้อความ/วันที่/ตัวเลข/สกุลเงิน เปลี่ยนตาม locale **ทันที** (ไม่ reload หน้า)
- เข้าหน้า `/admin` (lazy) คีย์ใน scope `admin.*` ต้องถูกแปลถูกต้อง
- รีเฟรชหน้า: ภาษาเดิมยังคงอยู่

---

## README สรุป (ให้ Claude แทรกในคำตอบ)
```bash
# 1) ติดตั้งแพ็กเกจ i18n
npm i @ngneat/transloco @ngneat/transloco-http-loader @ngneat/transloco-locale

# 2) สร้างไฟล์ตามโครงสร้าง src/app/** และ assets/i18n/**
# 3) รัน
npm start
```

### เพิ่มภาษาใหม่
- เพิ่ม `assets/i18n/fr.json`
- เติม `'fr'` ใน `availableLangs`
- ผูก locale ใน `langToLocaleMapping` เช่น `fr: 'fr-FR'`

### Best Practices
- ใช้ key สั้น ชัดเจน เป็นหมวดหมู่ (`app.*`, `home.*`, `admin.*`)
- หลีกเลี่ยงข้อความฮาร์ดโค้ดใน template
- แยก scope ตาม feature เพื่อลด payload และจัดระเบียบ

> **สำคัญ:** ให้ Claude ส่งมอบ **โค้ดเต็มทุกไฟล์** ตามที่ระบุ (คอมไพล์ได้) พร้อมคำอธิบายสั้น ๆ แต่ละส่วน และคำสั่งรันโปรเจกต์
