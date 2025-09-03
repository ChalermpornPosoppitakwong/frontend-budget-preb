import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin } from './admin';
import { Roles } from './roles/roles';
import { RolesEdit } from './roles-edit/roles-edit';

const routes: Routes = [
  {
    path: '',
    component: Admin
  },
  {
    path: 'roles',
    component: Roles
  },
  {
    path: 'roles/edit/:id',
    component: RolesEdit
  },
  {
    path: 'roles/create',
    component: RolesEdit
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
