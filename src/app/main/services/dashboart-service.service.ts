import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Finca, Cultivo, Planta, Tarea } from '../interfaces/main.interfaces';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboartService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public obtenerFincas(): Observable<Finca[]> {
    return this.http.get<Finca[]>(`${environment.baseURL}/fincas/`);
  }

  public obtenerCultivos(id: number): Observable<Cultivo[]> {
    return this.http.get<Cultivo[]>(`${environment.baseURL}/cultivos/?finca=${id}`);
  }

  public obtenerPlantas(id: number): Observable<Planta[]> {
    return this.http.get<Planta[]>(`${environment.baseURL}/plantas/?cultivo=${id}`);
  }

  public obtenerMisTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${environment.baseURL}/mistareas/`);
  }

}
