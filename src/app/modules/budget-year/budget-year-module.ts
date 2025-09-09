import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BudgetYear } from './budget-year';

const routes: Routes = [
    { path: '', component: BudgetYear }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class BudgetYearModule { }