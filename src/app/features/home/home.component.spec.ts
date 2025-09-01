import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
	let component: HomeComponent;

	beforeEach(() => {
		component = new HomeComponent();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have userName property', () => {
		expect(component.userName).toBe('Rende');
	});

	it('should have amount property', () => {
		expect(component.amount).toBe(1999.99);
	});

	it('should have date property as Date instance', () => {
		expect(component.date).toBeInstanceOf(Date);
	});
});
