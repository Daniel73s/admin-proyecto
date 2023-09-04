import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ProveedoresService } from './services/proveedores.service';
import { Proveedor } from 'src/app/helpers/interfaces/proveedor.interface';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.page.html',
  styleUrls: ['./proveedores.page.scss'],
})
export class ProveedoresPage implements OnInit {

  constructor(private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private _Proveedores: ProveedoresService) { }

  private loading: any;
  public texto:string='';
  public Arrproveedores:Proveedor[]=[];
  ngOnInit() {
    this.solicitarProveedores();
  }

  public buscar(e: any) {
    console.log(e.target.value);
    this.texto=e.target.value;
  }
  public filtrarporestado(e:any){
    if (e.detail.value === 'todos') {
      this.solicitarProveedores();
    } else {
      this._Proveedores.getProveedores().then(proveedores=>{
        this.Arrproveedores=proveedores.filter(proveedor=>{
          return proveedor.estado == e.detail.value
        })
      })
    }
      
  }

  private solicitarProveedores() {
    this._Proveedores.getProveedores().then((proveedores:Proveedor[])=>{
      this.Arrproveedores=proveedores;
    }).catch(error=>{
      console.log(error.message);
    });
  }

  async presentAlertConfirm(accion: string) {
    const btnText = accion === 'activo' ? "Habilitar" : "Eliminar";
    const message = accion === 'activo' ? "¿ Decea habilitar proveedor ?" : "¿ Decea eliminar proveedor ?";
    const alert = await this.alertCtrl.create({
      header: 'Mensaje',
      message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: btnText,
          handler: () => {
            this.presentLoading(accion);
            setTimeout(() => {
              this.loading.dismiss();
              this.mensaje(2000, 'Se realizo la accion correctamente', 'checkmark-outline', 'top');
            }, (2000));
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

  async presentCS() {
    const alert = await this.alertCtrl.create({
      header: 'Mensaje',
      message: '¿ Se presento el certificado sanitario correspondiente ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Presentar',
          handler: () => {
            console.log('Confirm Okay');
            this.presentLoading('Procesando');
            setTimeout(() => {
              this.loading.dismiss();
              this.mensaje(2000, 'Se presento el certificado correspondiente', 'document-text-outline', 'top');
            }, (2000));
          }
        }
      ]
    });

    await alert.present();
  }
}
