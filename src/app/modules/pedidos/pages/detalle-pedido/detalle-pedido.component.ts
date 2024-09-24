import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.scss'],
})
export class DetallePedidoComponent {
  private id_pedido!: string;
  public pedido:any;
  constructor(private ActivateRouted: ActivatedRoute, 
    private _pedidos: PedidosService,
  private router:Router) { }

  ionViewWillEnter() {
    this.id_pedido = this.ActivateRouted.snapshot.params['id_pedido'];
    this.getPedido(this.id_pedido);
  }

  private getPedido(id_pedido: string) {
    this._pedidos.getPedidoById(id_pedido).then((resp: any) => {
      console.log(resp);
      
      this.pedido=resp;
    }).catch(e => {
      console.log(e);
    })
  }

  public verProveedor(id_proveedor:string){
    this.router.navigate(['/dashboard/proveedores/detalle-proveedor',id_proveedor]);
  }
  public verColegio(id_colegio:string){
    this.router.navigate(['/dashboard/colegios/informacion-colegio',id_colegio]);
  }

}
