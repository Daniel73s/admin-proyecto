import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../services/productos.service';


@Component({
  selector: 'app-detalle-producto-page',
  templateUrl: './detalle-producto-page.component.html',
  styleUrls: ['./detalle-producto-page.component.scss'],
})
export class DetalleProductoPageComponent  implements OnInit {
public producto:any;
  constructor(private readonly route: ActivatedRoute,
    private _productos:ProductosService,
  private router:Router) { }

  ngOnInit() {
    // Obtiene el valor del parámetro de ruta `id`
    const id= this.route.snapshot.paramMap.get('id');
    this.getProducto(id!)
  }
  private getProducto(id:string){
    this._productos.detalleProducto(id).then((resp:any)=>{
      console.log(resp);
      this.producto=resp
    });
  }

  public verProveedor(id:string){
      this.router.navigate([`/dashboard/proveedores/detalle-proveedor`,id]);
  }
}
