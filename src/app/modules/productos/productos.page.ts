import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Producto } from 'src/app/helpers/interfaces/producto.interface';
import { ProductosService } from './services/productos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit, OnDestroy {
  private loading: any;
  public texto: string = '';
  public listaProductos: Producto[] = [];
  constructor(private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router,
    private _Productos: ProductosService) { }

  ngOnInit() {
    this.getProductos();
  }

  ngOnDestroy(): void {
    
  }

  private getProductos(){
    this._Productos.getProductos().then((item:Producto[])=>{
      this.listaProductos = item;
    });
  }

  public buscar(e: any) {
    this.texto = e.detail.value;
  }

  public filtrarporestado(e: any) {
    if (e.detail.value === 'todos') {
      this.getProductos();
    } else {
      this._Productos.getProductos().then(item=>{
        this.listaProductos=item.filter(item=>{
          return item.estado === e.detail.value
        })
      })
    }
  }

  async presentAlertConfirm(accion: string) {
    const btnText = accion === 'activo' ? "Habilitar" : "Eliminar";
    const message = accion === 'activo' ? "¿ Decea habilitar este producto ?" : "¿ Decea eliminar este producto ?";
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
    const message = accion === 'activo' ? "Habilitando producto" : "Eliminando producto";
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

  public opendetalles(id: string) {
    this.router.navigate([`/dashboard/productos/detalle-producto/${id}`])
  }
  public updateForm(id:string){
   this.router.navigate([`/dashboard/productos/modificar-producto/${id}`])
  }
}
