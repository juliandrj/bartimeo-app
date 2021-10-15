import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RespuestaLogin, Usuario } from '../interfaces/login.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient ) { }

  public login(usuario: Usuario): Observable<RespuestaLogin> {
    return this.http.post<RespuestaLogin>(`${environment.baseURL}/auth/`, usuario)
      .pipe(
        tap(
          respuesta => {
            if (respuesta.token) {
              localStorage.setItem('token', respuesta.token);
            }
          }
        )
      );
  }

  public verificar(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      return of(false);
    }
    return this.http.post<RespuestaLogin>(`${environment.baseURL}/verify/`, {token: token})
      .pipe(
        map(respuesta => {
          console.log(respuesta);
          return respuesta.token !== undefined;
        })
      );
  }

}
