import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ProveedoresService } from './services/proveedores.service';
import { Proveedor } from 'src/app/helpers/interfaces/proveedor.interface';
import { Router } from '@angular/router';
import { CreateUsuarioComponent } from './modals/create-usuario/create-usuario.component';
import { UpdatePassComponent } from './modals/update-pass/update-pass.component';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UpdateImgComponent } from './modals/update-img/update-img.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.page.html',
  styleUrls: ['./proveedores.page.scss'],
})
export class ProveedoresPage {

  constructor(private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private _Proveedores: ProveedoresService,
    private _usuarios: UsuariosService,
    private route: Router,
    private modalCtrl: ModalController) { }

  private loading: any;
  public texto: string = '';
  public Arrproveedores: Proveedor[] = [];
  ionViewWillEnter() {
    this.solicitarProveedores();
  }

  public buscar(e: any) {
    this.texto = e.target.value;
  }

  public filtrarporestado(e: any) {
    if (e.detail.value === 'todos') {
      this.solicitarProveedores();
    } else {
      this._Proveedores.getProveedores().then((proveedores: any) => {
        this.Arrproveedores = proveedores.filter((pro: any) => {
          return pro.estado === e.detail.value
        });
      });
    }
  }

  private solicitarProveedores() {
    this._Proveedores.getProveedores().then((proveedores: any) => {
      this.Arrproveedores = proveedores;
    }).catch(error => {
      console.log(error.message);
    });
  }

  async AlertConfirm(id: string, accion: string) {
    const titulo = (accion === 'activo') ? "Habilitar" : "Eliminar";
    const message = (accion === 'activo') ? "¿ Esta seguro de habilitar proveedor ?" : "¿ Esta seguro de eliminar proveedor ?";
    const alert = await this.alertCtrl.create({
      header: titulo,
      message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: "Aceptar",
          handler: () => {
            //Realizar la accion para cambiar de estado al proveedor
            console.log(id, accion);
            this._Proveedores.updateEstado(id, accion).then((resp: any) => {
              this.mensaje(2000, resp.mensaje, 'checkmark-outline', "top");
              this.solicitarProveedores();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentLoading(accion: string) {
    const message = accion === 'activo' ? "Habilitando Proveedor" : "Eliminando Proveedor";
    this.loading = await this.loadingCtrl.create({
      message,
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

  async presentCS(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Presentar',
      message: '¿ Se presento el certificado sanitario correspondiente ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Presentar',
          handler: () => {
            this._Proveedores.updateCS(id, 'valido').then((resp: any) => {
              this.mensaje(2000, resp.mensaje, 'checkmark-outline', "top");
              this.solicitarProveedores();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  public updateForm(id: string) {
    this.route.navigate([`/dashboard/proveedores/modificar-proveedor/${id}`]);
  }

  public detalleProveedor(id: string) {
    this.route.navigate([`/dashboard/proveedores/detalle-proveedor/${id}`]);
  }

  public async createUsuarioModal(id_proveedor: string) {
    const modal = await this.modalCtrl.create({
      component: CreateUsuarioComponent,
      componentProps: {
        id_proveedor
      },
      backdropDismiss: false
    })
    await modal.present();
    const resp = await modal.onDidDismiss();
    if (resp.data == 'success') {
      this.solicitarProveedores();
    }
  }

  public async updatePassModal(usuario: string) {
    const modal = await this.modalCtrl.create({
      component: UpdatePassComponent,
      componentProps: {
        usuario
      },
      backdropDismiss: false
    })
    await modal.present();
    const resp = await modal.onDidDismiss();
    if (resp.data == 'success') {
      this.solicitarProveedores();
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
            this._usuarios.updateEstadoUsuario(usuario, estado).then((resp: any) => {
              this.mensaje(2000, resp.mensaje, 'checkmark-outline', 'top');
              this.solicitarProveedores();
            })
          }
        }
      ]
    });

    await alert.present();
  }
  async updateImgModal(id_proveedor:string,imagen: string) {
    const modal = await this.modalCtrl.create({
      component: UpdateImgComponent,
      backdropDismiss:false,
      cssClass:'modal-css-mod-image',
      componentProps: {
        id_imagen: this.getIdImage(imagen),
        url: imagen,
        id_proveedor
      },
      mode:'md',
      animated:true
      
    });
    await modal.present();
    const resp = await modal.onDidDismiss();
    if (resp.data=='success') {
      this.solicitarProveedores();
    }
  }

  private getIdImage(url:string):string{
    const arrimagen=url.split('/');
    const nameimage=arrimagen[arrimagen.length-1];
    const [id]=nameimage.split('.');
    return id
  }
}
