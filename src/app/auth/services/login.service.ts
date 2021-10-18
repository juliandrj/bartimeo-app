import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RespuestaLogin, Credenciales, Usuario } from '../interfaces/login.interfaces';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { OpcionMenu } from 'src/app/shared/interfaces/manu.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _usuarioDummy: Usuario = {
    pk: -1,
    email: '',
    first_name: '',
    last_name: '',
    username: ''
  };

  private _usuario: Usuario = this.usuarioDummy;
  private _menu: MenuItem[] = [];

  public get usuarioDummy() {
    return {...this._usuarioDummy};
  }

  public get usuario() {
    return {...this._usuario};
  }

  public get menu() {
    return [...this._menu];
  }

  public get esUsuarioDummy(): boolean {
    return this.usuario.pk === this.usuarioDummy.pk;
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private opcionMenu2MenuItem(opcionMenu: OpcionMenu): MenuItem {
    return {
      id: opcionMenu.id + '',
      label: opcionMenu.label,
      icon: 'pi pi-fw pi-circle-off',
      routerLink: [opcionMenu.ruta],
      items: []
    };
  }

  private obtenerItemsHijos(opciones: OpcionMenu[], opcion: OpcionMenu): MenuItem[] {
    var hijos = opciones.filter(om => om.opcion_padre === opcion.id);
    if (hijos && hijos.length > 0) {
      return Array.from(hijos, h => {
        var item = this.opcionMenu2MenuItem(h);
        item.items = this.obtenerItemsHijos(opciones, h);
        if (item.items.length === 0) {
          item.items = undefined;
        } else {
          item.routerLink = undefined;
        }
        return item;
      });
    }
    return [];
  }

  private obtenerMenu(opciones: OpcionMenu[]): void {
    var padres = opciones.filter(om => om.opcion_padre === null);
    if (padres && padres.length > 0) {
      padres.forEach(opcion => {
        var item = this.opcionMenu2MenuItem(opcion);
        item.items = this.obtenerItemsHijos(opciones, opcion);
        if (item.items.length === 0) {
          item.items = undefined;
        } else {
          item.routerLink = undefined;
        }
        this._menu.push(item);
      });
    }
  }

  public identificarSesion(): boolean {
    if (localStorage.getItem('token')) {
      var strJson = localStorage.getItem('usuario');
      if (strJson) {
        this._usuario = JSON.parse(strJson);
        strJson = localStorage.getItem('menu');
        if (strJson) {
          this._menu = JSON.parse(strJson);
          return true;
        }
      }
    }
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    return false;
  }

  public obtenerUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.baseURL}/rest-auth/user/`)
      .pipe(
        tap(
          usuario => {
            this._usuario = usuario;
            localStorage.setItem('usuario', JSON.stringify(this._usuario));
          }
        ),
        catchError(() => {
          return of(this.usuarioDummy);
        })
      );
  }

  public login(credenciales: Credenciales): Observable<boolean> {
    return this.http.post<RespuestaLogin>(`${environment.baseURL}/auth/`, credenciales)
      .pipe(
        tap(
          respuesta => {
            if (respuesta.token) {
              localStorage.setItem('token', respuesta.token);
            }
          }
        ),
        switchMap(() => {
          return this.obtenerUsuario()
            .pipe(
              switchMap(
                () => {
                  return this.http.get<OpcionMenu[]>(`${environment.baseURL}/menu/`)
                    .pipe(
                      map(
                        menu => {
                          this.obtenerMenu(menu);
                          localStorage.setItem('menu', JSON.stringify(this._menu));
                          return true;
                        }
                      ),
                      catchError(() => {
                        return of(false);
                      })
                    );
                }
              ),
              catchError(errorRequest => {
                  return of(errorRequest.ok);
                }
              )
            );
        }),
        catchError(errorRequest => {
            return of(errorRequest.ok);
          }
        )
      );
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this._usuario = this.usuarioDummy;
    this.router.navigate(['/auth/login/']);
  }

  public verificar(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/auth/login/']);
      return of(false);
    }
    return this.http.post<RespuestaLogin>(`${environment.baseURL}/verify/`, {token})
      .pipe(
        map(
          () => {
            return true;
          }
        ),
        catchError(
          () => {
            this.logout();
            return of(false);
          }
        )
      );
  }

}
