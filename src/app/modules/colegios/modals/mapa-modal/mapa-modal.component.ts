import { Component, OnInit, Renderer2 } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-mapa-modal',
  templateUrl: './mapa-modal.component.html',
  styleUrls: ['./mapa-modal.component.scss'],
})
export class MapaModalComponent implements OnInit {
  //Variables para el mapa de mapbox
  mapbox = (mapboxgl as typeof mapboxgl);
  // map!: mapboxgl.Map;
  map!: any;
  public lat: any = -21.529409;
  public lng: any = -64.731242;
  private style = 'mapbox://styles/mapbox/satellite-streets-v12';
  constructor(private render:Renderer2) { 
    this.mapbox.accessToken = environment.apikey_mapbox; 
  }

  ngOnInit() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });
    this.map.on('load', () => {
      const div_marker=this.render.createElement('div');
      this.render.addClass(div_marker,'marker_class');
      this.map.resize();
     new mapboxgl.Marker({ draggable:true, element:div_marker,scale: 1.5, anchor:'bottom'})
                  .setLngLat([-64.72963740796527, -21.529598683813973])
                  .addTo(this.map)
    // marcador.getElement().classList.add('animate__animated', 'animate__bounce' ,'animate__infinite')
    });
  }

}
