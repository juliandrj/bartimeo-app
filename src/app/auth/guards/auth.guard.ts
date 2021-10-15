import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.loginService.verificar()
      .pipe(
        tap(
          estaAutenticado => {
            if (!estaAutenticado) {
              this.router.navigate(['/auth/login']);
            }
          }
        )
      );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.loginService.verificar()
      .pipe(
        tap(
          estaAutenticado => {
            if (!estaAutenticado) {
              this.router.navigate(['/auth/login']);
            }
          }
        )
      );
  }
}
