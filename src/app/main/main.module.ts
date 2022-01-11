import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    PrimeNGModule
  ]
})
export class MainModule { }
