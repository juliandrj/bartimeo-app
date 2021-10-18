import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { LoginService } from './auth/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  
  constructor(
    private primeNGConfig: PrimeNGConfig,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.primeNGConfig.ripple = true;
    if (this.loginService.identificarSesion()) {
      this.router.navigate(['/main/dashboard/']);
    }
  }

  public ObtenerRutaActual(): string {
    return this.router.url;
  }

  public salir(): void {
    this.loginService.logout();
  }

}
