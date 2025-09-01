import { routes } from './app.routes';

describe('routes', () => {
	it('should be defined', () => {
		expect(routes).toBeDefined();
	});

	it('should be an array', () => {
		expect(Array.isArray(routes)).toBe(true);
	});

	it('should have initial routes configured', () => {
		expect(routes.length).toBeGreaterThan(0);
		expect(routes[0].path).toBe('');
	});

	it('should have admin route with lazy loading', async () => {
		const adminRoute = routes.find((route) => route.path === 'admin');
		expect(adminRoute).toBeDefined();
		expect(adminRoute?.loadComponent).toBeDefined();

		// Test lazy loading function
		if (adminRoute?.loadComponent) {
			const component = await adminRoute.loadComponent();
			expect(component).toBeDefined();
		}
	});
});
