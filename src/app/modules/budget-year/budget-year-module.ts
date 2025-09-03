import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-budget-year',
    standalone: true,
    template: `<h2>งบประมาณประจำปี</h2>`
})
export class BudgetYearComponent { }

const routes: Routes = [
    { path: '', component: BudgetYearComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), BudgetYearComponent],
})
export class BudgetYearModule { }