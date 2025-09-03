import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostCenterChain } from './cost-center-chain';

const routes: Routes = [
  { path: '', component: CostCenterChain },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostCenterChainRoutingModule { }
