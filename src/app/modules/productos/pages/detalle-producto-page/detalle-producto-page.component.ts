import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/helpers/interfaces/producto.interface';
import { ProductosService } from '../../services/productos.service';


@Component({
  selector: 'app-detalle-producto-page',
  templateUrl: './detalle-producto-page.component.html',
  styleUrls: ['./detalle-producto-page.component.scss'],
})
export class DetalleProductoPageComponent  implements OnInit {
public producto:any;
  constructor(private readonly route: ActivatedRoute,private _productos:ProductosService) { }

  ngOnInit() {
    // Obtiene el valor del parámetro de ruta `id`
    const id= this.route.snapshot.paramMap.get('id');
    this.getProducto(id)
  }
  private getProducto(id:string | null){
    this._productos.getProductos().then((items:Producto[])=>{
      this.producto=items.find((item:Producto)=>{
        return item.id===id
      });
    });
  }
}
