import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.page.html',
  styleUrls: ['./proveedores.page.scss'],
})
export class ProveedoresPage implements OnInit {

  constructor(private alertCtrl:AlertController,
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController) { }

    private loading:any;
  ngOnInit() {
  }

  public buscar(e:any){
      console.log(e.target.value);
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Mensaje',
      message: 'Decea dar de baja proveedor ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Baja',
          handler: () => {
            console.log('Confirm Okay');
            this.presentLoading('Procesando Baja');
            setTimeout(() => {
              this.loading.dismiss();
              this.mensaje(2000,'Se dio de baja a proveedor','checkmark-outline','top');
            }, (2000));
          }
        }
      ]
    });

    await alert.present();
  }

  async presentLoading(message:string) {
    this.loading = await this.loadingCtrl.create({
      message,
      spinner: 'dots'
    });
    await this.loading.present();
  }

  async mensaje(duration:number,message:string,icon:string,position: 'top' | 'bottom') {
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
              this.mensaje(2000,'Se presento el certificado correspondiente','document-text-outline','top');
            }, (2000));
          }
        }
      ]
    });

    await alert.present();
  }
}
