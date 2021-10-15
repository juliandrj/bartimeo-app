import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrabajadorRoutingModule } from './trabajador-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    TrabajadorRoutingModule
  ]
})
export class TrabajadorModule { }
