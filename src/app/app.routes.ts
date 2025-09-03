import { Routes } from '@angular/router';
import { MainLayout } from '@core/layouts/main-layout/main-layout';
import { Login } from '@modules/unauth/login/login';

export const routes: Routes = [
    {
        path: 'home',
        component: MainLayout,
        loadChildren: () => import('@modules/home/home-module').then(m => m.HomeModule)
    },
    {
        path: 'budget-year',
        component: MainLayout,
        loadChildren: () => import('@modules/budget-year/budget-year-module').then(m => m.BudgetYearModule)
    },
    {
        path: 'cost-center-chain',
        component: MainLayout,
        loadChildren: () => import('@modules/cost-center-chain/cost-center-chain-module').then(m => m.CostCenterChainModule)
    },
    {
        path: 'admin',
        component: MainLayout,
        loadChildren: () => import('@modules/admin/admin-module').then(m => m.AdminModule)
    },
    {
        path: 'login',
        component: Login
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
