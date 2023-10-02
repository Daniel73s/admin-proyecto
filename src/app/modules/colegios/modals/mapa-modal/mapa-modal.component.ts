import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  // public lat: any = -21.529409;
  // public lng: any = -64.731242;
  private style = 'mapbox://styles/mapbox/streets-v12';
  private marker!: mapboxgl.Marker;

  @Input()
  lng:string='';
  @Input()
  lat:string='';
  constructor(private render: Renderer2, private modalCtrl: ModalController) {
    this.mapbox.accessToken = environment.apikey_mapbox;
  }

  ngOnInit() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [Number(this.lng), Number(this.lat)]
    });
    this.map.on('load', () => {
      const div_marker = this.render.createElement('div');
      this.render.addClass(div_marker, 'marker_class');
      this.map.resize();
      this.marker = new mapboxgl.Marker({ draggable: true, element: div_marker, scale: 1.5, anchor: 'bottom' })
        .setLngLat([Number(this.lng), Number(this.lat)])
        .addTo(this.map)
      // marcador.getElement().classList.add('animate__animated', 'animate__bounce' ,'animate__infinite')
    });
  }


  public close() {
    this.modalCtrl.dismiss();
  }

  public confirmar() {
    const {lng,lat}=this.marker.getLngLat();
    this.modalCtrl.dismiss({lng,lat},'ok');
  }


}
