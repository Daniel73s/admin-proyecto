import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/helpers/interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private url:string='assets/data/productos.json'
  constructor(private http:HttpClient) { }

  //obteniendo todos los productos 
  async getProductos(): Promise<Producto[]> {
    const data: any = await this.http.get(this.url).toPromise();
    return data.productos as Producto[];
  }

  
}
