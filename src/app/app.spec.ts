import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [App],
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(App);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it('should render title', () => {
		const fixture = TestBed.createComponent(App);
		fixture.detectChanges();
		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.querySelector('h1')?.textContent).toContain(
			'Hello, frontend-budget-preb',
		);
	});

	it('should have title property', () => {
		const fixture = TestBed.createComponent(App);
		const app = fixture.componentInstance;
		expect(app['title']).toBe('frontend-budget-preb');
	});

	it('should have protected title property', () => {
		const fixture = TestBed.createComponent(App);
		const app = fixture.componentInstance;
		expect(typeof app['title']).toBe('string');
		expect(app['title']).toBeDefined();
	});
});
