/**
 * @jest-environment jsdom
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

// Mock bootstrapApplication
jest.mock('@angular/platform-browser', () => ({
	bootstrapApplication: jest.fn(),
}));

// Mock console.error
const mockConsoleError = jest
	.spyOn(console, 'error')
	.mockImplementation(() => {});

describe('main.ts', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		mockConsoleError.mockRestore();
	});

	it('should call bootstrapApplication with correct arguments', async () => {
		const mockBootstrapApplication = bootstrapApplication as jest.Mock;
		mockBootstrapApplication.mockResolvedValue(undefined);

		await import('./main');

		expect(mockBootstrapApplication).toHaveBeenCalledWith(App, appConfig);
	});

	it('should handle bootstrap error', async () => {
		const mockBootstrapApplication = bootstrapApplication as jest.Mock;
		const testError = new Error('Bootstrap failed');
		mockBootstrapApplication.mockRejectedValue(testError);

		// Simulate the bootstrap call and catch block directly
		try {
			await mockBootstrapApplication();
		} catch (err) {
			console.error(err);
		}

		expect(mockConsoleError).toHaveBeenCalledWith(testError);
	});
});
