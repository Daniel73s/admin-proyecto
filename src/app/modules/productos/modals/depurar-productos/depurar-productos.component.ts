import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-depurar-productos',
  templateUrl: './depurar-productos.component.html',
  styleUrls: ['./depurar-productos.component.scss'],
})
export class DepurarProductosComponent implements OnInit {
  public min: number = 1;
  public max: number = 2;
  public rangomax:number=5;
  constructor(private _productos: ProductosService,private toastCtrl:ToastController,private modalCtrl:ModalController) {
  }

  ngOnInit() {
  }

  public rangos(e: any) {
    const { lower, upper } = e.detail.value;
    this.min = lower;
    this.max = upper;
  }

  public actualizar_productos() {
    this._productos.depurarProductos(Number(this.min), Number(this.max)).then((resp: any) => {
      this.mensaje(resp.mensaje,3000,"top");
      this.modalCtrl.dismiss("success");
    }).catch((error)=>{
      console.log(error);
      this.mensaje("ocurrio un error inesperado",3000,"top");
    })
  }


  async mensaje(message:string,duration:number,position: "top" | "bottom" | "middle") {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      position
    });
    toast.present();
  }

  public cambiarRango(e:any){
      if(Number(e.detail.value)<0 || e.detail.value==''){
        return 
      }

      this.rangomax=Number(e.detail.value);
      
  }
}
