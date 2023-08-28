import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  private loading: any;
  constructor(private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  buscar(e: any) {
    console.log(e);

  }
  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar',
      message: 'Decea eliminar este producto ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'eliminar',
          handler: () => {
            console.log('Confirm Okay');
            this.presentLoading();
            setTimeout(() => {
              this.loading.dismiss();
              this.mensaje(2000,'Se elimino el producto','checkmark-outline','top');
            }, (2000));
          }
        }
      ]
    });

    await alert.present();
  }
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Eliminando Producto',
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
}
