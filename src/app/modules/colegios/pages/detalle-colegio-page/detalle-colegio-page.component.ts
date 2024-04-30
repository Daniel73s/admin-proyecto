import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ColegiosService } from '../../services/colegios.service';
import { DetalleMapModalComponent } from '../../modals/detalle-map-modal/detalle-map-modal.component';

@Component({
  selector: 'app-detalle-colegio-page',
  templateUrl: './detalle-colegio-page.component.html',
  styleUrls: ['./detalle-colegio-page.component.scss'],
})
export class DetalleColegioPageComponent implements OnInit {

  constructor(private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private _colegios: ColegiosService) { }
  private id: string = '';
  public colegio: any = {};
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this._colegios.getOneColegio(this.id).then((resp: any) => {
      this.colegio = resp;
    })
  }

  public async abrir_mapa() {
    const modal=await this.modalCtrl.create({
      component: DetalleMapModalComponent,
      componentProps: {
        lng: this.colegio.longitud,
        lat: this.colegio.latitud
      },
      cssClass:'modal-css-map'
    });
    await modal.present();
  }



}
