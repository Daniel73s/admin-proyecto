import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent {
  public pedidos: any[] = [];
  public estado: string = 'todos';
  public open:boolean=false;
  constructor(private _pedidos: PedidosService,private router:Router,private toastCtrl:ToastController) { }

  ionViewWillEnter() {
    this.getPedidos();
  }

  private getPedidos() {
    this._pedidos.getAllPedidos().then((resp: any) => {
      this.pedidos = resp;
    }).catch(e => {
      console.log(e);
    })
  }

  public filtarPorEstado(e: any) {
    this.estado = e.detail.value;
  }

  public getPedidoById(id_pedido:string) {
      this.router.navigate(['/dashboard/pedidos/detalle-pedido',id_pedido]);
  }

  public copiar(id:string){
      navigator.clipboard.writeText(id).then(()=>{
        this.mensaje("se copio correctamente",500,"top");
      }).catch(()=>{
        this.mensaje("ocurrio un error al copiar",1000,"top");
      })
  }


  async mensaje(message:string, duration:number,position:"top"|"middle"|"bottom") {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      position
    });
    toast.present();
  }
}
