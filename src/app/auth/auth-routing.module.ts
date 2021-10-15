import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';



const rutasAuth: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(rutasAuth)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
