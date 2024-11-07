import { Component } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { CreateUsuarioComponent } from './modals/create-usuario/create-usuario.component';
import { AdministradoresService } from './services/administradores.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { UpdatePasswordComponent } from './modals/update-password/update-password.component';

@Component({
  selector: 'app-adms',
  templateUrl: './adms.component.html',
  styleUrls: ['./adms.component.scss'],
})
export class AdmsComponent {

  constructor(private modalctrl: ModalController,
    private alertctrl: AlertController,
    private _administradores: AdministradoresService,
    private toastCtrl: ToastController,
    private _usuarios: UsuariosService,
    private router: Router) { }
  public listadms: any[] = [];
  ionViewWillEnter() {
    this.SolicitarAdministradores();
  }
  //abrir el modal para crear la cuenta de usuario
  async openmodal(id: string) {
    const modal = await this.modalctrl.create({
      component: CreateUsuarioComponent,
      backdropDismiss: false,
      componentProps: {
        id_admin: id
      }
    })
    await modal.present()
    const data = await modal.onDidDismiss();
    if (data.data == 'success') {
      this.SolicitarAdministradores();
    }
  }

  async AlertConfirm(usuario: string, estado: string) {
    const titulo = (estado == 'activo') ? 'Habilitar' : 'Deshabilitar';
    const message = (estado == 'activo') ? 'Esta seguro de habilitar la cuenta' : 'Esta seguro de desabilitar la cuenta';
    const alert = await this.alertctrl.create({
      header: titulo,
      message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'aceptar',
          handler: () => {
            this._usuarios.updateEstadoUsuario(usuario, estado).then((resp: any) => {
              this.mensaje(resp.mensaje, 2000, 'top', 'checkmark-outline', 'dark');
            }).catch(e => console.log)
              .finally(() => {
                this.SolicitarAdministradores();
              });
          }
        }
      ]
    });

    await alert.present();
  }

  private SolicitarAdministradores() {
    this._administradores.getAdministradores().then((resp: any) => {
      this.listadms = resp;
    }).catch(e => {
      console.log(e.message);
      this.mensaje('Ocurrio un error al traer la informacion', 2000, 'top', 'warning-outline', 'danger');
    });
  }

  async mensaje(message: string, duration: number, position: 'top' | 'bottom', icon: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      position,
      icon,
      color
    });
    toast.present();
  }

  public detalleAdministrador(id_admin: string) {
    this.router.navigate(['/dashboard/administradores/perfil_administrador',id_admin]);
  }

  public async updatePasswordModal(usuario:string){ 
      const modal=await this.modalctrl.create({
        component:UpdatePasswordComponent,
        componentProps:{
         usuario
        },
        backdropDismiss:false
      });
      await modal.present();
      const resp = await modal.onDidDismiss();
      if (resp.data == 'success') {
        this.SolicitarAdministradores();
      }
  }
}
