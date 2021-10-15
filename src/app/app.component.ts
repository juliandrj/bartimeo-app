import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  
  constructor(private primeNGConfig: PrimeNGConfig, private router: Router) {}

  ngOnInit() {
    this.primeNGConfig.ripple = true;
  }

  public ObtenerRutaActual(): string {
    return this.router.url;
  }

}
