import { Component} from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ColegiosService } from './services/colegios.service';

@Component({
  selector: 'app-colegios',
  templateUrl: './colegios.page.html',
  styleUrls: ['./colegios.page.scss'],
})
export class ColegiosPage{

  constructor(private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private _colegios: ColegiosService) { }
  private loading: any;
  public arr_colegios: any[] = [];
  public load: boolean = true;
  public textobuscar: string = '';
  // ngOnInit() {
  //   this.colegios();
  // }

  ionViewWillEnter(){
    this.colegios();
  }

  buscar(e: any) {
    this.textobuscar = e.detail.value;
  }

  public filtrarporestado(e: any) {
    if (e.detail.value === 'todos') {
      this.colegios();
    } else {
      const estado = e.detail.value == 'activo';
      this._colegios.getColegios().then(colegios => {
        this.arr_colegios = colegios.filter(colegio => {
          return colegio.estado === estado;
        });
      });
    }

  }

  public colegios() {
    this._colegios.getColegios().then(resp => {
      this.arr_colegios = resp;
    }).finally(() => {
      this.load = false;
    })
  }


  async presentAlertConfirm(accion: string, id: string) {
    const message = accion === 'baja' ? 'Esta seguro de dar de baja al colegio?' : 'Esta seguro de habilitar al colegio?';
    const alert = await this.alertCtrl.create({
      header: 'Mensaje',
      message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
            this.mensaje(2000,'Se cancelo la accion', 'close-outline', 'top');
          }
        }, {
          text: accion,
          handler: () => {
            this.presentLoading();
            if (accion === 'baja') {
              this._colegios.deleteColegio(id).then((resp: any) => {
                this.mensaje(2000, resp.msg, 'checkmark-outline', 'top');
                this.colegios();
              }).finally(() => {
                this.loading.dismiss();
              });
            } else {
              console.log('ejecutar funcoin de habilitar');
              this._colegios.habilitarColegio(id).then((resp: any) => {
                this.mensaje(2000, resp.msg, 'checkmark-outline', 'top');
                this.colegios();
              }).finally(() => {
                this.loading.dismiss();
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Procesando baja',
      spinner: 'dots'
    });
    await this.loading.present();
  }

  async mensaje(duration: number, message: string, icon: string, position: 'top' | 'bottom') {
    const toast = await this.toastCtrl.create({
      duration,
      message,
      icon,
      position
    });
    toast.present();
  }
}
