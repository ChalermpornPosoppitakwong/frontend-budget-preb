import { environment } from './environment.prod';

describe('Production Environment', () => {
	it('should be defined', () => {
		expect(environment).toBeDefined();
	});

	it('should have production flag set to true', () => {
		expect(environment.production).toBe(true);
	});
});
