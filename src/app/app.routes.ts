import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{
		path: 'admin',
		loadComponent: () =>
			import('./features/admin/admin.component').then((m) => m.AdminComponent),
	},
];
