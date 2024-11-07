import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Producto } from 'src/app/helpers/interfaces/producto.interface';
import { ProductosService } from './services/productos.service';
import { ProveedoresService } from '../proveedores/services/proveedores.service';
import { ModImageComponent } from './modals/mod-image/mod-image.component';
import { DepurarProductosComponent } from './modals/depurar-productos/depurar-productos.component';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage {
  private loading: any;
  public texto: string = '';
  public listaProductos: Producto[] = [];
  public listaProveedores: any[] = [];
  constructor(private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router,
    private _Productos: ProductosService,
    private _proveedores: ProveedoresService,
    private modalCtrl: ModalController) { }

  ionViewWillEnter() {
    this.getProductos();
    this.getProveedores();
  }

  private getProductos() {
    this._Productos.getProductos().then((resp: any) => {
      this.listaProductos = resp;      
    });
  }

  private getProveedores() {
    this._proveedores.getProveedores().then((resp: any) => {
      this.listaProveedores = resp;
    });
  }

  public buscar(e: any) {
    this.texto = e.detail.value;
  }

  public detalle_proveedor(id: string) {
    this.router.navigate(['/dashboard/proveedores/detalle-proveedor/', id]);
  }

  public filtrarporestado(e: any) {
    if (e.detail.value === 'todos') {
      this.getProductos();
    } else {
      this._Productos.getProductos().then((productos: any) => {
        this.listaProductos = productos.filter((pro: any) => {
          return pro.estado === e.detail.value
        });
      });
    }
  }

  public filtrarPorProveedor(e: any) {
    const param = e.detail.value;
    if (param === 'todos') {
      this.getProductos();
    } else {
      this._Productos.getProductos().then((productos: any) => {
        this.listaProductos = productos.filter((pro: any) => {
          return pro.id_proveedor === param
        });
      });
    }
  }

  async AlertConfirm(id: string, accion: string) {
    const titulo = (accion === 'activo') ? "Habilitar" : "Eliminar";
    const message = (accion === 'activo') ? "¿ Esta seguro de habilitar producto ?" : "¿ Esta seguro de eliminar producto ?";
    const alert = await this.alertCtrl.create({
      header: titulo,
      message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          }
        }, {
          text: "Aceptar",
          handler: () => {
            //Realizar la accion para cambiar de estado al proveedor
            this._Productos.updateEstadoProducto(id, accion).then((resp: any) => {
              this.mensaje(2000, resp.mensaje, 'checkmark-outline', 'top');
              this.getProductos();
            });
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
  
  public updateForm(id: string) {
    this.router.navigate([`/dashboard/productos/modificar-producto/${id}`])
  }

  async openModalUpdateImage(id_producto:string,imagen: string) {
    const modal = await this.modalCtrl.create({
      component: ModImageComponent,
      backdropDismiss:false,
      cssClass:'modal-css-mod-image',
      componentProps: {
        id_imagen: this.getIdImage(imagen),
        url: imagen,
        id_producto
      },
      mode:'md',
      animated:true
      
    });
    await modal.present();
    const modaldata = await modal.onDidDismiss();
    if (modaldata.data) {
      this.getProductos();
    }
  }

  private getIdImage(url:string):string{
    const arrimagen=url.split('/');
    const nameimage=arrimagen[arrimagen.length-1];
    const [id]=nameimage.split('.');
    return id
  }


  public async clasificarproductos(){
    const modal=await this.modalCtrl.create({
      component:DepurarProductosComponent
    })
    await modal.present();
    const modaldata = await modal.onDidDismiss();
    if (modaldata.data=="success") {
      this.getProductos();
    }
  }
}
