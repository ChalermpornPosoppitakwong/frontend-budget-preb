import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin } from './admin';
import { Roles } from './roles/roles';
import { RolesEdit } from './roles-edit/roles-edit';
import { Menu } from './menu/menu';
import { MenuApi } from './menu-api/menu-api';

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
  },
  {
    path: 'menu',
    component: Menu
  },
  {
    path: 'menu/api',
    component: MenuApi
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
