import { Component, OnInit } from '@angular/core';
import { DashboartService } from '../../services/dashboart-service.service';
import { MenuItem } from 'primeng/api';
import * as mapboxgl from 'mapbox-gl';
import { Planta } from '../../interfaces/main.interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public menuPanel: MenuItem[] = [];
  private mapa!: mapboxgl.Map;
  public plantas: Planta[] = [];
  private colores: string[] = ['#145A32','#F4D03F','#CB4335','#ABB2B9','#273746','#3498DB',];
  private marcadores: mapboxgl.Marker[] = [];

  constructor(private http: DashboartService) { }

  ngOnInit(): void {
    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [-74.07600527462621, 4.598165250967687],
      zoom: 5
    });
    this.http.obtenerFincas().
      subscribe(fincas => {
        fincas.forEach((finca) => {
          var itemsCultivo: MenuItem[] = [];
          finca.cultivos.forEach((cultivo) => {
            itemsCultivo.push({
              id: "" + cultivo.id,
              label: cultivo.tipoCultivo.tipoCultivo,
              command: (event) => {
                this.buscarPlantas(+event.item.id);
              },
              items: [{
                id: cultivo.id + 'tareas',
                label: 'Ver mis tareas',
                command: (event) => {
                  this.buscarTareas();
                }
              }]
            });
          });
          this.menuPanel.push({
            id: "" + finca.id,
            label: finca.nombreFinca,
            items: itemsCultivo,
          });
        });
      });
  }

  public buscarPlantas(idCultivo: number): void {
    this.http.obtenerPlantas(idCultivo).subscribe(plantas => {
      if (plantas.length > 0) {
        this.mapa.flyTo({
          center: [
            +plantas[0].posicion.longitud,
            +plantas[0].posicion.latitud,
          ],
          essential: true,
          zoom: 19,
        });
        this.plantas = plantas;
        this.agregarMarcadores();
      }
    });
  }

  private agregarMarcadores(): void {
    this.plantas.forEach((p) => {
      if (p.marcador) {
        p.marcador.remove();
      } else {
        p.marcador = new mapboxgl.Marker({
          color: p.estadosPlanta.length === 0 ? this.colores[0] : this.colores[p.estadosPlanta[0].estadoPlanta.nivel],
          draggable: false,
          scale: 0.5
        });
        p.marcador.setLngLat([+p.posicion.longitud,+p.posicion.latitud]);
        p.marcador.setPopup(new mapboxgl.Popup().setHTML(`<h4>Planta ${p.linea},${p.consecutivo}</h4>${(p.estadosPlanta.length > 0 ? '<h5>' + p.estadosPlanta[0].estadoPlanta.etiqueta + ':</h5><p>' + p.estadosPlanta[0].observacion + '</p>' : '')}`));
      }
      p.marcador.addTo(this.mapa);
    });
  }

  public buscarTareas(): void {
    this.http.obtenerMisTareas().subscribe(tareas => {
      tareas.forEach(t => {
        t.plantas.forEach(tp => {
          this.plantas.forEach(p => {
            if (p.id === tp) {
              p.marcador = new mapboxgl.Marker({
                color: this.colores[5],
                draggable: false,
                scale: 1
              });
              p.marcador.setLngLat([+p.posicion.longitud,+p.posicion.latitud]);
              p.marcador.setPopup(new mapboxgl.Popup().setHTML(`<h4>Planta ${p.linea},${p.consecutivo}</h4>
              <h5>${t.tareaPlantilla.tareaPlantilla}</h5>
              <p>${t.tareaPlantilla.descripcion}</p>
              <a href="javascript:window.open('http://localhost:8000/admin/modelos/planta/${p.id}/change/?_to_field=id&_popup=1', 'Planta ${p.linea},${p.consecutivo}', 'menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes,width=400,height=400');">Editar</a>`));
              return;
            }
          });
          this.agregarMarcadores();
        });
      });
    });
  }

}
