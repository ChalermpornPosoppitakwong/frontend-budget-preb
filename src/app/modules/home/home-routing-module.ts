import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home';
import { Announcements } from './announcements/announcements';

const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'announcements',
    component: Announcements
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
