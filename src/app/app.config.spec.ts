import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { appConfig } from './app.config';

@Component({
	template: '<div>Test Component</div>',
})
class TestComponent {}

describe('appConfig', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: appConfig.providers,
			imports: [TestComponent],
		}).compileComponents();
	});

	it('should provide router', () => {
		const router = TestBed.inject(Router);
		expect(router).toBeDefined();
	});

	it('should provide location', () => {
		const location = TestBed.inject(Location);
		expect(location).toBeDefined();
	});

	it('should have all required providers', () => {
		expect(appConfig.providers).toBeDefined();
		expect(Array.isArray(appConfig.providers)).toBe(true);
		expect(appConfig.providers.length).toBeGreaterThan(0);
	});
});
