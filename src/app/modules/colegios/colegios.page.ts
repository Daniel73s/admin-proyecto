import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-colegios',
  templateUrl: './colegios.page.html',
  styleUrls: ['./colegios.page.scss'],
})
export class ColegiosPage implements OnInit {

  constructor(private alertCtrl:AlertController,
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController) { }

    private loading:any;
  ngOnInit() {
  }

  buscar(e: any) {
    console.log(e);
  }

  
  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Mensaje',
      message: 'Decea dar de baja al colegio ?',
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
            this.presentLoading();
            setTimeout(() => {
              this.loading.dismiss();
              this.mensaje(2000,'Se dio de baja al colegio','checkmark-outline','top');
            }, (2000));
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
