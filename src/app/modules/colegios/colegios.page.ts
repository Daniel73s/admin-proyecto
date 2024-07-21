import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ColegiosService } from './services/colegios.service';
import { Router } from '@angular/router';
import { CreateUsuarioComponent } from './modals/create-usuario/create-usuario.component';
import { UpdatePassComponent } from './modals/update-pass/update-pass.component';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-colegios',
  templateUrl: './colegios.page.html',
  styleUrls: ['./colegios.page.scss'],
})
export class ColegiosPage {

  constructor(private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private _colegios: ColegiosService,
    private router: Router,
    private modalCtrl: ModalController,
    private _usuarios: UsuariosService) { }
  public arr_colegios: any[] = [];
  public load: boolean = true;
  public textobuscar: string = '';
  // ngOnInit() {
  //   this.colegios();
  // }

  ionViewWillEnter() {
    this.colegios();
  }

  public buscar(e: any) {
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
            this.mensaje(2000, 'Se cancelo la accion', 'close-outline', 'top');
          }
        }, {
          text: accion,
          handler: () => {
            if (accion === 'baja') {
              this._colegios.deleteColegio(id).then((resp: any) => {
                this.mensaje(2000, resp.msg, 'checkmark-outline', 'top');
              }).finally(() => {
                this.colegios();
              });
            } else {
              this._colegios.habilitarColegio(id).then((resp: any) => {
                this.mensaje(2000, resp.msg, 'checkmark-outline', 'top');
              }).finally(() => {
                this.colegios();
              });
            }
          }
        }
      ]
    });

    await alert.present();
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

  public updateVentana(id: string) {
    this.router.navigate([`/dashboard/colegios/modificar-colegio/${id}`])
  }

  public detalle_colegio(id: string) {
    this.router.navigate([`/dashboard/colegios/informacion-colegio/${id}`]);
  }

  public async addUsuario(id_colegio: string) {
    const modal = await this.modalCtrl.create({
      component: CreateUsuarioComponent,
      componentProps: {
        id_colegio
      },
      backdropDismiss: false
    });
    await modal.present();
    const resp = await modal.onDidDismiss();
    if (resp.data == 'success') {
      this.colegios();
    }
  }

  public async updatepass(usuario: string) {
    const modal = await this.modalCtrl.create({
      component: UpdatePassComponent,
      componentProps: {
        usuario
      },
      backdropDismiss: false
    });
    await modal.present();
    const resp = await modal.onDidDismiss();
    if (resp.data == 'success') {
      this.colegios();
    }
  }

  public async modEstadoUsuario(usuario: string, estado: string) {
    const titulo = (estado == 'activo') ? 'Habilitar' : 'Deshabilitar';
    const message = (estado == 'activo') ? '¿Esta seguro de habilitar usuario?' : '¿Esta seguro de deshabilitar usuario?';
    const alert = await this.alertCtrl.create({
      header: titulo,
      message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            console.log(usuario, estado);
            this._usuarios.updateEstadoUsuario(usuario,estado).then((resp:any)=>{
              this.mensaje(2000,resp.mensaje,'checkmark-outline','top');
              this.colegios();
            })
          }
        }
      ]
    });

    await alert.present();
  }


}
